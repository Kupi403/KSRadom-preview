
import { OptionsType } from './types'

export const getCurrentCaption = <T extends string | number>(
	options: OptionsType<T>[],
	value: T
): string => {
	const defaultOption = options.find(option => option.default)
	return options.find(option => option.value === value)?.caption ?? defaultOption?.caption ?? ''
}

export const buildDropdownItem = <T extends string | number>(
	option: OptionsType<T>,
	value: T,
	setValue: (value: T) => void,
	setIsOpen: (value: boolean) => void,
	styles: Record<string, string>
) => {
	const isSelected = option.value === value
	const classNames = [
		styles.dropdownItem,
		isSelected ? styles.selected : '',
		option.disabled ? styles.disabled : '',
	].join(' ')

	const handleSelect = () => {
		if (!option.disabled) {
			setValue(option.value)
			setIsOpen(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if ((e.key === 'Enter' || e.key === ' ') && !option.disabled) {
			e.preventDefault()
			handleSelect()
		}
	}

	return { isSelected, classNames, handleSelect, handleKeyDown }
}