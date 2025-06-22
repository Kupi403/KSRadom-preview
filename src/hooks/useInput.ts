'use client'
import { useState } from 'react'

type ValidateFunction<T> = (value: T) => boolean

const useInput = <T>(validateValue: ValidateFunction<T>, initialValue?: T) => {
	const [value, setValue] = useState<T>(initialValue || ('' as T))
	const [isTouched, setIsTouched] = useState(false)

	const valueIsValid = validateValue(value)
	const hasError = !valueIsValid && isTouched

	const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const target = event.target
		let newValue: T

		if (target instanceof HTMLInputElement) {
			if (target.type === 'checkbox') {
				newValue = target.checked as unknown as T
			} else {
				newValue = target.value as T
			}
		} else {
			newValue = target.value as T
		}

		setValue(newValue)
	}

	const inputBlurHandler = () => {
		setIsTouched(true)
	}

	const reset = () => {
		setValue(initialValue || ('' as T))
		setIsTouched(false)
	}

	const setValue2 = (newValue: T) => {
		setValue(newValue)
	}

	return {
		value,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
		setValue: setValue2,
	}
}

export default useInput
