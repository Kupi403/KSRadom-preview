'use client'

import { useState, useEffect } from 'react'
import Input from './Input/Input'
import { getMaxDateForBirthInput, getMinDateForBirthInput, isEmail, isNotEmpty } from './utils'
import useInput from '@/hooks/useInput'
import { enqueueSnackbar } from 'notistack'
import { sendEmail } from '@/services/emailService'
import styles from './Form.module.scss'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import Select from './Input/Select'
import RadioButton from './Input/RadioButton'
import { RadioButtons } from './types'
import { EDUCATION_OPTIONS } from './const'
import Checkbox from './Input/Checkbox'

const ContactForm = () => {
	const {
		value: firstNameValue,
		isValid: firstNameIsValid,
		hasError: firstNameHasError,
		valueChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
		reset: resetFirstName,
	} = useInput<string>(isNotEmpty)

	const {
		value: lastNameValue,
		isValid: lastNameIsValid,
		hasError: lastNameHasError,
		valueChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
		reset: resetLastName,
	} = useInput<string>(isNotEmpty)

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput<string>(isEmail)

	const {
		value: birthDateValue,
		isValid: birthDateIsValid,
		hasError: birthDateHasError,
		valueChangeHandler: birthDateChangeHandler,
		inputBlurHandler: birthDateBlurHandler,
		reset: resetBirthDate,
	} = useInput<string>(isNotEmpty)

	const {
		value: selectedIsTeamOption,
		isValid: isTeamValid,
		valueChangeHandler: isTeamChangeHandler,
		inputBlurHandler: isTeamBlurHandler,
		reset: resetIsTeam,
	} = useInput<string>(val => val === RadioButtons.Yes || val === RadioButtons.No, RadioButtons.No)

	const {
		value: teamNameValue,
		isValid: teamNameIsValid,
		hasError: teamNameHasError,
		valueChangeHandler: teamNameChangeHandler,
		inputBlurHandler: teamNameBlurHandler,
		reset: resetTeamName,
	} = useInput<string>(isNotEmpty)

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
	} = useInput<string>(() => true)

	const {
		value: termsAccepted,
		isValid: termsAcceptedIsValid,
		hasError: termsAcceptedHasError,
		valueChangeHandler: termsAcceptedChangeHandler,
		inputBlurHandler: termsAcceptedBlurHandler,
		reset: resetTermsAccepted,
	} = useInput<boolean>(value => value === true, false)

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
		resetTermsAccepted()
	}

	const areInputsValid = () => {
		const basicFieldsValid =
			firstNameIsValid &&
			lastNameIsValid &&
			emailIsValid &&
			birthDateIsValid &&
			educationIsValid &&
			messageIsValid &&
			isTeamValid &&
			termsAcceptedIsValid

		if (selectedIsTeamOption === RadioButtons.Yes) {
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
			teamName: selectedIsTeamOption === RadioButtons.Yes ? teamNameValue : '',
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
			termsAcceptedBlurHandler()

			if (selectedIsTeamOption === RadioButtons.Yes) {
				teamNameBlurHandler()
			}

			enqueueSnackbar('Proszę uzupełnić wszystkie wymagane pola!', {
				variant: 'warning',
				anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
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
		termsAcceptedIsValid,
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
					errorMessage='Imię jest wymagane.'
					required
				/>
				<Input
					label='Nazwisko'
					value={lastNameValue}
					onChange={lastNameChangeHandler}
					onBlur={lastNameBlurHandler}
					hasError={lastNameHasError}
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
					// className={styles.input}
					errorMessage='Data urodzenia jest wymagana.'
					required
					min={getMinDateForBirthInput()}
					max={getMaxDateForBirthInput()}
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
							label={RadioButtons.Yes}
							name='team'
							value={RadioButtons.Yes}
							onChange={isTeamChangeHandler}
							onBlur={isTeamBlurHandler}
							checked={selectedIsTeamOption === RadioButtons.Yes}
						/>
						<RadioButton
							label={RadioButtons.No}
							name='team'
							value={RadioButtons.No}
							onChange={isTeamChangeHandler}
							onBlur={isTeamBlurHandler}
							checked={selectedIsTeamOption === RadioButtons.No}
						/>
					</div>

					{selectedIsTeamOption === RadioButtons.Yes && (
						<Input
							label='Podaj nazwę klubu'
							type='text'
							value={teamNameValue}
							onChange={teamNameChangeHandler}
							onBlur={teamNameBlurHandler}
							hasError={teamNameHasError}
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
			<div className={styles.group}>
				<Checkbox
					label='Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z ustawą o ochronie danych osobowych w związku z realizacją zgłoszenia. Podanie danych jest dobrowolne, ale niezbędne do przetworzenia wniosku licencyjnego. Zostałem /am poinformowany /a, że przysługuje mi prawo dostępu do swoich danych, możliwości ich poprawiania, żądania zaprzestania ich przetwarzania. Administratorem danych osobowych jest Mazowiecki Związek Piłki Nożnej Delegatura Radom, ul. Chrobrego 52, 26-600 Radom'
					name='terms'
					value='accepted'
					classNames={styles.checkbox}
					checked={termsAccepted}
					onChange={termsAcceptedChangeHandler}
					onBlur={termsAcceptedBlurHandler}
					required
					hasError={termsAcceptedHasError}
					errorMessage='To pole jest obowiązkowe'
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
