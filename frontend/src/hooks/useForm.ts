// hooks/useForm.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { FormConfig, UseFormReturn, UseFormField } from '@/types/form.types'
import { validationRules } from '@/utils/validations'
import { enqueueSnackbar } from 'notistack'

const useFormField = (validation?: (value: string) => boolean): UseFormField => {
	const [value, setValue] = useState('')
	const [isTouched, setIsTouched] = useState(false)

	const isValid = validation ? validation(value) : true
	const hasError = !isValid && isTouched

	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(event.target.value)
	}, [])

	const onBlur = useCallback(() => {
		setIsTouched(true)
	}, [])

	const reset = useCallback(() => {
		setValue('')
		setIsTouched(false)
	}, [])

	return {
		value,
		isValid,
		hasError,
		onChange,
		onBlur,
		reset,
	}
}

export const useForm = (config: FormConfig): UseFormReturn => {
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Create fields dynamically based on config
	const fields: Record<string, UseFormField> = {}
	const fieldValidations: Record<string, boolean> = {}

	config.groups.forEach(group => {
		group.fields.forEach(fieldConfig => {
			const validation = fieldConfig.validation || (fieldConfig.required ? validationRules.isNotEmpty : undefined)

			// eslint-disable-next-line react-hooks/rules-of-hooks
			fields[fieldConfig.name] = useFormField(validation)
			fieldValidations[fieldConfig.name] = fieldConfig.required || false
		})
	})

	// Check if form is valid
	const isFormValid = Object.entries(fields).every(([name, field]) => {
		return fieldValidations[name] ? field.isValid : true
	})

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// Trigger validation on all fields
		Object.values(fields).forEach(field => field.onBlur())

		if (!isFormValid) {
			enqueueSnackbar('Proszę uzupełnić wszystkie wymagane pola!', {
				variant: 'warning',
				anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
				preventDuplicate: true,
			})
			return
		}

		setIsSubmitting(true)

		// Prepare form data
		const formData: Record<string, string> = {}
		Object.entries(fields).forEach(([name, field]) => {
			formData[name] = field.value
		})

		try {
			await config.onSubmit(formData)

			enqueueSnackbar('Formularz został pomyślnie wysłany!', {
				variant: 'success',
				anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
				preventDuplicate: true,
			})

			// Reset form after successful submission
			Object.values(fields).forEach(field => field.reset())
		} catch (error) {
			console.error('Błąd podczas wysyłania formularza:', error)

			enqueueSnackbar('Nie udało się wysłać formularza. Spróbuj ponownie później.', {
				variant: 'error',
				anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
				preventDuplicate: true,
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const resetForm = useCallback(() => {
		Object.values(fields).forEach(field => field.reset())
	}, [fields])

	return {
		fields,
		isFormValid,
		isSubmitting,
		handleSubmit,
		resetForm,
	}
}
