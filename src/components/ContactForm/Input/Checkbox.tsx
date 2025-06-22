import styles from './Input.module.scss'
import { CheckboxProps } from './types'

const Checkbox = ({
	label,
	name,
	value,
	checked,
	onChange,
	required,
	classNames,
	hasError,
	errorMessage,
	...props
}: CheckboxProps) => {
	return (
		<div className={`${styles['input-box']} ${classNames || ''}`}>
			<label className={`${styles.label} ${styles['checkbox-box']}`}>
				<input
					type='checkbox'
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					className={`${styles.input} ${styles.outline}`}
					{...props}
				/>
				{label}
				{required && ' *'}
			</label>

			<div className={styles.errorContainer}>
				{hasError && errorMessage && <p className={styles.message}>{errorMessage}</p>}
			</div>
		</div>
	)
}

export default Checkbox
