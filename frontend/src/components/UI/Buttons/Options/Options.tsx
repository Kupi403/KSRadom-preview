import { useState, useEffect, useRef } from 'react'
import styles from './Options.module.scss'
import Chevron from '@/components/UI/Buttons/Dropdown'
import LoadingButton from './LoadingButton'

export type OptionsType<T extends string | number = string> = {
	value: T
	caption: string
	default?: boolean
	disabled?: boolean
}

type OptionProps<T extends string | number = string> = {
	title?: string
	options: OptionsType<T>[]
	value: T
	setValue: (value: T) => void
	loading?: boolean
}

const Options = <T extends string | number = string>({ title, options, value, setValue, loading }: OptionProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const dropdownRef = useRef<HTMLUListElement>(null)
	const selectedOptionRef = useRef<HTMLLIElement>(null)

	const defaultOption = options.find(opt => opt.default)
	const currentCaption = options.find(opt => opt.value === value)?.caption ?? defaultOption?.caption ?? ''

	const updatePosition = () => {
		if (buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setDropdownPosition({
				top: rect.bottom,
				left: rect.left,
				width: rect.width,
			})
		}
	}
	const handleSetOption = (option: OptionsType<T>) => {
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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				!buttonRef.current ||
				!dropdownRef.current ||
				buttonRef.current.contains(event.target as Node) ||
				dropdownRef.current.contains(event.target as Node)
			) {
				return
			}
			setIsOpen(false)
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (isOpen && selectedOptionRef.current) {
			selectedOptionRef.current.scrollIntoView({ block: 'start', behavior: 'auto' })
		}
		if (isOpen && buttonRef.current) {
			const rect = buttonRef.current.getBoundingClientRect()
			setDropdownPosition({
				top: rect.bottom,
				left: rect.left,
				width: rect.width,
			})
		}
		if (isOpen) {
			updatePosition()
			window.addEventListener('scroll', updatePosition)
			window.addEventListener('resize', updatePosition)
		}

		return () => {
			window.removeEventListener('scroll', updatePosition)
			window.removeEventListener('resize', updatePosition)
		}
	}, [isOpen])

	if (loading) {
		return <LoadingButton />
	} else {
		return (
			<div className={styles.container}>
				<button
					ref={buttonRef}
					onClick={() => setIsOpen(prev => !prev)}
					className={styles.button}
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					aria-controls='dropdown-list'
					type='button'>
					<p>
						{title && <span>{title}: </span>}
						{currentCaption}
					</p>
					<Chevron
						className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`}
						dark
					/>
				</button>

				{isOpen && dropdownPosition && (
					<ul
						ref={dropdownRef}
						id='dropdown-list'
						role='listbox'
						className={styles.dropdown}
						style={{
							position: 'fixed',
							top: dropdownPosition.top,
							left: dropdownPosition.left,
							width: dropdownPosition.width,
							maxHeight: 300,
							overflowY: 'auto',
							zIndex: 1000,
						}}>
						{options.map(option => {
							const { isSelected, classNames, handleSelect, handleKeyDown } = handleSetOption(option)
							return (
								<li
									key={option.value}
									role='option'
									aria-selected={isSelected}
									aria-disabled={option.disabled || undefined}
									tabIndex={0}
									ref={isSelected ? selectedOptionRef : undefined}
									className={classNames}
									onClick={handleSelect}
									onKeyDown={handleKeyDown}>
									<span>{option.caption}</span>
									{isSelected && <span>✔</span>}
								</li>
							)
						})}
					</ul>
				)}
			</div>
		)
	}
}

export default Options
