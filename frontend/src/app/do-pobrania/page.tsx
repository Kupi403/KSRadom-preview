import { Suspense } from 'react'
import SubpageManager from '@/components/SubpageManager/SubpageManager'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'

const page = () => {
	return (
		<SectionContainer
			title='Do pobrania'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<SubpageManager name='do pobrania' />
			</Suspense>
		</SectionContainer>
	)
}

export default page
