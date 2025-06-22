'use client'

import { useState, useEffect } from 'react'
import Input from './Input/Input'
import { isEmail, isNotEmpty } from './utils'
import useInput from '@/hooks/useInput'
import { enqueueSnackbar } from 'notistack'
import { sendEmail } from '@/services/emailService'
import styles from './Form.module.scss'
import CTAButton from '../UI/Buttons/CTA/CTAButton'

const ContactForm = () => {
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput(isNotEmpty)

	const {
		value: messageValue,
		isValid: messageIsValid,
		hasError: messageHasError,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
		reset: resetMessage,
	} = useInput(isNotEmpty)

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail)

	const [formIsValid, setFormIsValid] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const resetInputs = () => {
		resetFirstName()
		resetEmail()
		resetMessage()
	}

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!formIsValid) {
			firstNameBlurHandler()
			messageBlurHandler()
			emailBlurHandler()
			enqueueSnackbar('Proszę uzupełnić wszystkie wymagane pola!', {
				variant: 'warning',
				anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
				preventDuplicate: true,
			})
			return
		}

		setIsSubmitting(true)
		const emailData = {
			firstName: firstNameValue,
			message: messageValue,
			email: emailValue,
			time: new Date().toLocaleString('pl', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
		}

		try {
			await sendEmail(emailData, 'contact_form')

			enqueueSnackbar('Wiadomość została pomyślnie wysłana!', {
				variant: 'success',
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
				preventDuplicate: true,
			})
			resetInputs()
			setFormIsValid(false)
		} catch (error) {
			console.error('Błąd podczas wysyłania wiadomości:', error)

			enqueueSnackbar('Nie udało się wysłać wiadomości. Spróbuj ponownie później.', {
				variant: 'error',
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
				preventDuplicate: true,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	useEffect(() => {
		if (firstNameIsValid && messageIsValid && emailIsValid) {
			setFormIsValid(true)
		} else {
			setFormIsValid(false)
		}
	}, [firstNameIsValid, messageIsValid, emailIsValid])

	return (
		<form
			onSubmit={submitHandler}
			className={styles.form}>
			<div className={styles.group}>
				<Input
					label='Imię'
					value={firstNameValue}
					onChange={firstNameChangeHandler}
					onBlur={firstNameBlurHandler}
					hasError={firstNameHasError}
					errorMessage='Imię jest wymagane.'
					required
				/>
			</div>

			<div className={styles.group}>
				<Input
					label='Email'
					type='email'
					value={emailValue}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					hasError={emailHasError}
					errorMessage='Email jest wymagany.'
					required
				/>
			</div>

			<div className={styles.group}>
				<Input
					label='Wiadomość'
					textarea
					value={messageValue}
					onChange={messageChangeHandler}
					onBlur={messageBlurHandler}
					hasError={messageHasError}
					errorMessage='Treść wiadomości jest wymagana.'
					required
				/>
			</div>

			<div className={styles.button}>
				<CTAButton
					priority='primary'
					type='submit'
					disabled={isSubmitting}>
					Wyślij
				</CTAButton>
			</div>
		</form>
	)
}

export default ContactForm
