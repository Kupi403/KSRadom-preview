import { Suspense } from 'react'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import Contact from '@/components/Contact/Contact'

const page = () => {
	return (
		<SectionContainer
			title='Kontakt'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<Contact />
			</Suspense>
		</SectionContainer>
	)
}

export default page
