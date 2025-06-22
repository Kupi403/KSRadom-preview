import { FORM_ERROR } from '@/constant/fallback'
import styles from './Input.module.scss'
import { InputProps } from './types'

const Input = ({
	classNames,
	placeholder,
	label,
	type,
	textarea,
	hasError,
	errorMessage,
	required,
	...props
}: InputProps) => {
	return (
		<div className={styles['input-box']}>
			<label
				htmlFor={label}
				className={styles.label}>
				{label} {required && '*'}
			</label>

			{textarea ? (
				<textarea
					className={`${styles.textarea} ${styles.input}`}
					placeholder={placeholder ?? ''}
					id={label}
					{...props}
				/>
			) : (
				<input
					className={styles.input}
					placeholder={placeholder ?? ''}
					type={type ?? 'text'}
					id={label}
					{...props}
				/>
			)}

			<div className={styles.errorContainer}>
				{hasError && errorMessage && <p className={styles.message}>{errorMessage || FORM_ERROR}</p>}
			</div>
		</div>
	)
}

export default Input
