import Calendar from '@/components/Calendar/Calendar'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { Suspense } from 'react'

const CalendarPage = () => {
	return (
		<SectionContainer
			title='Kalendarz'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<Calendar />
			</Suspense>
		</SectionContainer>
	)
}

export default CalendarPage
