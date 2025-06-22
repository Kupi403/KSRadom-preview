import SubPageHeader from '@/components/Headers/SubPageHeader'
import styles from '../styles/layout.module.scss'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import CTAButton from '@/components/UI/Buttons/CTA/CTAButton'
import Wrapper from '@/components/UI/Wrapper/Wrapper'

const NotFound = () => {
	return (
		<>
			<SubPageHeader errorTitle='Nie znaleziono strony' />
			<Wrapper>
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
			</Wrapper>
		</>
	)
}

export default NotFound
