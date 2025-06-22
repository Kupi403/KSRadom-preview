import styles from './Input.module.scss'
import { RadioButtonProps } from './types'

const RadioButton = ({
	label,
	name,
	value,
	hasError,
	errorMessage,
	required,
	classNames,
	...props
}: RadioButtonProps) => {
	return (
		<div className={`${styles['input-box']} ${classNames || ''}`}>
			<label className={`${styles.label} ${styles['button-box']} ${styles.outline}`}>
				<input
					type='radio'
					name={name}
					value={value}
					required={required}
					className={styles.input}
					{...props}
				/>
				{label}
			</label>
		</div>
	)
}

export default RadioButton
