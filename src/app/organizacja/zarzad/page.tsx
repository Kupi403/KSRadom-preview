import { Suspense } from 'react'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import PageInProgress from '@/components/UI/States/PageInProgress'

const page = () => {
	return (
		<SectionContainer
			title='Zarząd'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<PageInProgress />
			</Suspense>
		</SectionContainer>
	)
}

export default page
