import styles from '../Options.module.scss'
import LoadingButton from '../LoadingButton'
import { OptionsButtonProps } from './types'

const Button = ({ title, value, isActive, isShown, setActiveEvents, loading }: OptionsButtonProps) => {
	if (loading) return <LoadingButton />
	return (
		<button
			className={`${styles.button} ${isActive ? styles.clicked : ''} ${!isShown ? styles.hidden : ''}`}
			onClick={() => setActiveEvents(value)}>
			{title && <span className={styles.title}>{title}</span>}
		</button>
	)
}

export default Button
