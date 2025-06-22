import inProgress from '@/../public/in-progress.svg'
import Image from 'next/image'
import styles from './States.module.scss'
import CTAButton from '../Buttons/CTA/CTAButton'
const PageInProgress = () => {
	return (
		<div className={styles.container}>
			<div className={`${styles.illustration} ${styles.full}`}>
				<Image
					src={inProgress}
					fill
					alt='Brak danych'
				/>
			</div>
			<CTAButton
				priority='tertiary'
				href='/'>
				Powrót
			</CTAButton>
		</div>
	)
}

export default PageInProgress
