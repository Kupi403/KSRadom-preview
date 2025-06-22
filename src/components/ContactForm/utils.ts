import { CandidateAges } from './types'
import { differenceInYears, format, subYears } from 'date-fns'

export const isNotEmpty = (value: string) => value.trim() !== ''
export const isEmail = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
export const isPhoneNumber = (value: string) => /^\+?[0-9\s-]{7,15}$/.test(value)

export const calculateAge = (birthDateInput: string | Date): number => {
	const birthDate = new Date(birthDateInput)
	const today = new Date()

	return differenceInYears(today, birthDate)
}

export const isTooYoung = (birthDate: string | Date): boolean => calculateAge(birthDate) < CandidateAges.Min

export const isAlmostEligible = (birthDate: string | Date): boolean => calculateAge(birthDate) === CandidateAges.Min

export const isAgeEligible = (birthDate: string | Date): boolean => {
	const age = calculateAge(birthDate)
	return age >= CandidateAges.Min && age <= CandidateAges.Max
}

export const getMaxDateForBirthInput = (): string => {
	const today = new Date()
	const minDate = subYears(today, CandidateAges.Min - 1)
	return format(minDate, 'yyyy-MM-dd')
}

export const getMinDateForBirthInput = (): string => {
	const today = new Date()
	const maxDate = subYears(today, CandidateAges.Max)
	return format(maxDate, 'yyyy-MM-dd')
}
