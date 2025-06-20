import SubpageManager from '@/components/SubpageManager/SubpageManager'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { Suspense } from 'react'

const page = () => {
	return (
		<SectionContainer
			title='Szkolenie'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<SubpageManager name='szkolenie' />
			</Suspense>
		</SectionContainer>
	)
}

export default page
