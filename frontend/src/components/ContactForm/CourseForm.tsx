'use client'

import { useState, useEffect } from 'react'
import Input from './Input/Input'
import { isEmail, isNotEmpty } from './utils'
import useInput from '@/hooks/useInput'
import { enqueueSnackbar } from 'notistack'
import { sendEmail } from '@/services/emailService'
import styles from './ContactForm.module.scss'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import Select from './Input/Select'
import RadioButton from './Input/RadioButton'
import { RADIO_BUTTONS } from './types'
import { EDUCATION_OPTIONS } from './const'

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
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput(isNotEmpty)

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail)

	const {
		value: birthDateValue,
		isValid: birthDateIsValid,
		hasError: birthDateHasError,
		valueChangeHandler: birthDateChangeHandler,
		inputBlurHandler: birthDateBlurHandler,
		reset: resetBirthDate,
	} = useInput(isNotEmpty)

	const {
		value: selectedIsTeamOption,
		isValid: isTeamValid,
		valueChangeHandler: isTeamChangeHandler,
		inputBlurHandler: isTeamBlurHandler,
		reset: resetIsTeam,
	} = useInput<string>(val => val === RADIO_BUTTONS.YES || val === RADIO_BUTTONS.NO, RADIO_BUTTONS.NO)

	const {
		value: teamNameValue,
		isValid: teamNameIsValid,
		hasError: teamNameHasError,
		valueChangeHandler: teamNameChangeHandler,
		inputBlurHandler: teamNameBlurHandler,

		reset: resetTeamName,
	} = useInput(isNotEmpty)

	const {
		value: selectedEducation,
		isValid: educationIsValid,
		hasError: educationHasError,
		valueChangeHandler: educationChangeHandler,
		inputBlurHandler: educationBlurHandler,
		reset: resetEducation,
	} = useInput<string>(val => val !== '')

	const {
		value: messageValue,
		isValid: messageIsValid,
		hasError: messageHasError,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
		reset: resetMessage,
	} = useInput(() => true)

	const [formIsValid, setFormIsValid] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const resetAllInputs = () => {
		resetFirstName()
		resetLastName()
		resetEmail()
		resetBirthDate()
		resetMessage()
		resetEducation()
		resetIsTeam()
		resetTeamName()
	}

	const areInputsValid = () => {
		const basicFieldsValid =
			firstNameIsValid &&
			lastNameIsValid &&
			emailIsValid &&
			birthDateIsValid &&
			educationIsValid &&
			messageIsValid &&
			isTeamValid

		if (selectedIsTeamOption === RADIO_BUTTONS.YES) {
			return basicFieldsValid && teamNameIsValid
		}

		return basicFieldsValid
	}

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const emailData = {
			firstName: firstNameValue,
			lastName: lastNameValue,
			name: `${firstNameValue} ${lastNameValue}`,
			email: emailValue,
			season: '2025/2026',
			birthDate: birthDateValue,
			education: selectedEducation,
			playsInTeam: selectedIsTeamOption,
			teamName: selectedIsTeamOption === RADIO_BUTTONS.YES ? teamNameValue : '',
			message: messageValue,
			time: new Date().toLocaleString('pl', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			}),
		}

		if (!areInputsValid()) {
			firstNameBlurHandler()
			lastNameBlurHandler()
			emailBlurHandler()
			birthDateBlurHandler()
			messageBlurHandler()
			educationBlurHandler()
			isTeamBlurHandler()

			if (selectedIsTeamOption === RADIO_BUTTONS.YES) {
				teamNameBlurHandler()
			}

			enqueueSnackbar('Proszę uzupełnić wszystkie wymagane pola!', {
				variant: 'warning',
				anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
				preventDuplicate: true,
			})
			return
		}

		setIsSubmitting(true)

		if (formIsValid)
			try {
				await sendEmail(emailData, 'course_form')

				enqueueSnackbar('Wiadomość została pomyślnie wysłana!', {
					variant: 'success',
					anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
					preventDuplicate: true,
				})
				resetAllInputs()
			} catch (error) {
				console.error('Błąd podczas wysyłania wiadomości:', error)

				enqueueSnackbar('Nie udało się wysłać wiadomości. Spróbuj ponownie później.', {
					variant: 'error',
					anchorOrigin: { horizontal: 'right', vertical: 'top' },
					preventDuplicate: true,
				})
			} finally {
				setIsSubmitting(false)
			}
	}

	useEffect(() => {
		setFormIsValid(areInputsValid())
	}, [
		firstNameIsValid,
		lastNameIsValid,
		emailIsValid,
		birthDateIsValid,
		messageIsValid,
		educationIsValid,
		isTeamValid,
		teamNameIsValid,
		selectedIsTeamOption,
	])

	return (
		<form
			onSubmit={submitHandler}
			className={styles.form}>
			<div className={styles.group}>
				<Input
					label='Imię'
					type='name'
					value={firstNameValue}
					onChange={firstNameChangeHandler}
					onBlur={firstNameBlurHandler}
					hasError={firstNameHasError}
					className={styles.input}
					errorMessage='Imię jest wymagane.'
					required
				/>
				<Input
					label='Nazwisko'
					value={lastNameValue}
					onChange={lastNameChangeHandler}
					onBlur={lastNameBlurHandler}
					hasError={lastNameHasError}
					className={styles.input}
					errorMessage='Nazwisko jest wymagane.'
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
					className={styles.input}
					errorMessage='Email jest wymagany.'
					required
				/>
				<Input
					label='Data urodzenia'
					type='date'
					value={birthDateValue}
					onChange={birthDateChangeHandler}
					onBlur={birthDateBlurHandler}
					hasError={birthDateHasError}
					className={styles.input}
					errorMessage='Data urodzenia jest wymagana.'
					required
				/>
			</div>

			<div className={styles.group}>
				<Select
					label='Wykształcenie'
					options={EDUCATION_OPTIONS}
					value={selectedEducation}
					onChange={educationChangeHandler}
					onBlur={educationBlurHandler}
					hasError={educationHasError}
					errorMessage='Wybierz wykształcenie'
					required
				/>
				<div className={styles.controls}>
					<p className={styles.label}>Czy grasz w klubie piłkarskim?</p>
					<div className={styles.buttons}>
						<RadioButton
							label={RADIO_BUTTONS.YES}
							name='team'
							value={RADIO_BUTTONS.YES}
							onChange={isTeamChangeHandler}
							onBlur={isTeamBlurHandler}
							checked={selectedIsTeamOption === RADIO_BUTTONS.YES}
						/>
						<RadioButton
							label={RADIO_BUTTONS.NO}
							name='team'
							value={RADIO_BUTTONS.NO}
							onChange={isTeamChangeHandler}
							onBlur={isTeamBlurHandler}
							checked={selectedIsTeamOption === RADIO_BUTTONS.NO}
						/>
					</div>

					{selectedIsTeamOption === RADIO_BUTTONS.YES && (
						<Input
							label='Podaj nazwę klubu'
							type='text'
							value={teamNameValue}
							onChange={teamNameChangeHandler}
							onBlur={teamNameBlurHandler}
							hasError={teamNameHasError}
							className={styles.input}
							errorMessage='Nazwa klubu jest wymagana.'
							required
						/>
					)}
				</div>
			</div>

			<div className={styles.group}>
				<Input
					label='Dodatkowe informacje o mnie'
					textarea
					value={messageValue}
					onChange={messageChangeHandler}
					onBlur={messageBlurHandler}
					hasError={messageHasError}
					errorMessage='To pole jest wymagane.'
					classNames={styles.textarea}
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
