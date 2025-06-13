import SectionContainer from '../UI/SectionContainer/SectionContainer'
import AsideCalendar from './AsideCalendar/AsideCalendar'
import UsefulLinks from './UsefulLinks/UsefulLinks'
import styles from './Aside.module.scss'

const Aside = () => {
	return (
		<aside className={styles.aside}>
			<SectionContainer
				priority='aside'
				isMainPage
				title='Kalendarz'>
				<AsideCalendar />
			</SectionContainer>
			<SectionContainer
				priority='aside'
				isMainPage
				title='Przydatne linki'>
				<UsefulLinks />
			</SectionContainer>
		</aside>
	)
}

export default Aside
