import React from 'react'
import styles from './SearchInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineClear } from 'react-icons/md'
import { SearchInputProps } from './types'

const SearchInput = ({ value, onChange, placeholder, isLoading }: SearchInputProps) => {
	if (isLoading) return <div className={styles.loading}></div>

	return (
		<div className={styles.wrapper}>
			<AiOutlineSearch
				size={20}
				className={styles.icon}
			/>
			<input
				type='input'
				aria-label={placeholder || 'Wyszukaj'}
				className={styles.input}
				value={value}
				placeholder={placeholder || 'Wyszukaj'}
				onChange={e => onChange(e.target.value)}
			/>

			{value && (
				<button
					type='button'
					className={styles.clear}
					onClick={() => onChange('')}
					aria-label='Wyczyść wyszukiwanie'>
					<MdOutlineClear size={18} />
				</button>
			)}
		</div>
	)
}

export default SearchInput
