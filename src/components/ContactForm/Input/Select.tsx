import { FORM_ERROR } from '@/constant/fallback'
import styles from './Input.module.scss'
import { SelectProps } from './types'

const Select = ({ label, options, hasError, errorMessage, required, classNames, ...props }: SelectProps) => {
	return (
		<div className={`${styles['input-box']} ${classNames || ''}`}>
			<label
				htmlFor={label}
				className={styles.label}>
				{label}
			</label>

			<select
				id={label}
				className={styles.input}
				// required={required}
				{...props}>
				{options.map(({ label, value, disabled }) => (
					<option
						key={value}
						value={value}
						disabled={disabled}
						className={styles.input}>
						{label}
					</option>
				))}
			</select>

			<div className={styles.errorContainer}>
				{hasError && errorMessage && <p className={styles.message}>{errorMessage || FORM_ERROR}</p>}
			</div>
		</div>
	)
}

export default Select
