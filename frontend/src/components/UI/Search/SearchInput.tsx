import React from 'react'
import styles from './SearchInput.module.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineClear } from 'react-icons/md'
type Props = {
	value: string
	onChange: (val: string) => void
	placeholder?: string
	isLoading?: boolean
}

const SearchInput = ({ value, onChange, placeholder, isLoading }: Props) => {
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
				placeholder={placeholder || 'Wyszukaj sędziego lub miasto'}
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
