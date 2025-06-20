import { useState, useEffect, useRef } from 'react'
import styles from './Options.module.scss'
import Chevron from '@/components/UI/Buttons/Dropdown'
import { OptionProps } from './types'
import { getCurrentCaption, buildDropdownItem } from './utils'

const Options = <T extends string | number = string>({ title, options, value, setValue, loading }: OptionProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownPosition, setDropdownPosition] = useState<{
		top: number
		left: number
		width: number
	} | null>(null)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const dropdownRef = useRef<HTMLUListElement>(null)
	const selectedOptionRef = useRef<HTMLLIElement>(null)

	const currentCaption = getCurrentCaption(options, value)

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				!buttonRef.current ||
				!dropdownRef.current ||
				buttonRef.current.contains(event.target as Node) ||
				dropdownRef.current.contains(event.target as Node)
			)
				return
			setIsOpen(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	useEffect(() => {
		if (isOpen) {
			updatePosition()
			window.addEventListener('scroll', updatePosition)
			window.addEventListener('resize', updatePosition)

			if (selectedOptionRef.current) {
				selectedOptionRef.current.scrollIntoView({ block: 'start', behavior: 'auto' })
			}
		}

		return () => {
			window.removeEventListener('scroll', updatePosition)
			window.removeEventListener('resize', updatePosition)
		}
	}, [isOpen])

	return (
		<div className={styles.container}>
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(prev => !prev)}
				className={loading ? styles.loading : styles.button}
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
						const { isSelected, classNames, handleSelect, handleKeyDown } = buildDropdownItem(
							option,
							value,
							setValue,
							setIsOpen,
							styles
						)

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

export default Options
