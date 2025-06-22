import { format, getYear, isAfter, isBefore } from 'date-fns'
import { pl } from 'date-fns/locale'

export const generateCalendarOptions = (
	dateMinBoundary: Date,
	dateMaxBoundary: Date
): { value: string; caption: string }[] => {
	const options = []
	const minYear = getYear(dateMinBoundary)
	const maxYear = getYear(dateMaxBoundary)

	for (let year = minYear; year <= maxYear; year++) {
		for (let month = 0; month < 12; month++) {
			const date = new Date(year, month)

			if (isBefore(date, dateMinBoundary) || isAfter(date, dateMaxBoundary)) continue

			options.push({
				value: `${year}-${month}`,
				caption: format(date, 'LLLL yyyy', { locale: pl }),
			})
		}
	}
	return options
}

export const handleSetNextMonth = (
	selectedYear: number,
	selectedMonth: number,
	setYear: (value: number | ((prev: number) => number)) => void,
	setMonth: (value: number | ((prev: number) => number)) => void,
	dateMaxBoundary: Date
) => {
	if (isAfter(new Date(selectedYear, selectedMonth + 1), dateMaxBoundary)) return

	if (selectedMonth === 11) {
		setYear(prev => prev + 1)
		setMonth(0)
	} else {
		setMonth(prev => prev + 1)
	}
}

export const handleSetPrevMonth = (
	selectedYear: number,
	selectedMonth: number,
	setYear: (value: number | ((prev: number) => number)) => void,
	setMonth: (value: number | ((prev: number) => number)) => void,
	dateMinBoundary: Date
) => {
	if (isBefore(new Date(selectedYear, selectedMonth + 1), dateMinBoundary)) return
	if (selectedMonth === 0 && selectedYear === 2025) return

	if (selectedMonth === 0) {
		setYear(prev => prev - 1)
		setMonth(11)
	} else {
		setMonth(prev => prev - 1)
	}
}
