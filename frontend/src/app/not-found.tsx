import SubPageHeader from '@/components/Headers/SubPageHeader'
import styles from '../styles/layout.module.scss'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import CTAButton from '@/components/UI/Buttons/CTA/CTAButton'

const NotFound = () => {
	return (
		<>
			<SubPageHeader errorTitle='Nie znaleziono strony' />
			<div className={styles.wrapper}>
				<SectionContainer priority='subpage'>
					<div className={styles['not-found']}>
						<h1>Błąd 404</h1>
						<p>Nie ma strony o podanym adresie</p>
						<CTAButton
							priority='error'
							href='/'>
							Powrót
						</CTAButton>
					</div>
				</SectionContainer>
			</div>
		</>
	)
}

export default NotFound
