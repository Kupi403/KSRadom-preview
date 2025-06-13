import CourseInfo from '@/components/CourseInfo/CourseInfo'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import PageInProgress from '@/components/UI/States/PageInProgress'
import React, { Suspense } from 'react'

const page = () => {
	return (
		<SectionContainer
			title='Zostań sędzią!'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<PageInProgress />
			</Suspense>
		</SectionContainer>
	)
}

export default page
