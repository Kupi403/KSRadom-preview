import CourseInfo from '@/components/CourseInfo/CourseInfo'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { Suspense } from 'react'

const page = () => {
	return (
		<SectionContainer
			title='Zostań sędzią!'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<CourseInfo />
			</Suspense>
		</SectionContainer>
	)
}

export default page
