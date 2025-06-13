import { Suspense } from 'react'
import AllNews from '@/components/News/AllNews/AllNews'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'

export default function AllNewsPage() {
	return (
		<SectionContainer
			title='Aktualności'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<AllNews />
			</Suspense>
		</SectionContainer>
	)
}
