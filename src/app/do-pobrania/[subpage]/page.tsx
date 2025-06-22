import { findHeaderTitle } from '@/components/Headers/utils'
import DownloadItems from '@/components/SubpageManager/DownloadItems/DownloadItems'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { Suspense } from 'react'
type PostPageProps = { params: Promise<{ subpage: string }> }
export default async function Page({ params }: PostPageProps) {
	const { subpage } = await params
	const subpageInfo = findHeaderTitle(subpage)

	return (
		<SectionContainer
			title={subpageInfo?.text}
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<DownloadItems
					category={subpageInfo?.text}
					showSeason={subpageInfo?.showSeason}
				/>
			</Suspense>
		</SectionContainer>
	)
}
