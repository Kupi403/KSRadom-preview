import FAQ from '@/components/FAQ/FAQ'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { Suspense } from 'react'

const page = () => {
	return (
		<SectionContainer
			title='FAQ dla kandydatów'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<FAQ />
			</Suspense>
		</SectionContainer>
	)
}

export default page
