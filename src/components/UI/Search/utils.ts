import { useState, useEffect } from 'react'

export const useDebouncedValue = <T>(value: T, delay = 300): T => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}

export default useDebouncedValue