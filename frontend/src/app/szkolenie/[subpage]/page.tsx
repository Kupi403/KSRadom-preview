import { useFindHeaderTitle } from '@/components/Headers/utils'
import DownloadItems from '@/components/SubpageManager/DownloadItems/DownloadItems'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
// import useFindHeaderTitle from '@/lib/helpers/findHeaderTitle'
import { Suspense } from 'react'
interface PostPageProps {
	params: { subpage: string }
}
const page = ({ params }: PostPageProps) => {
	const { subpage } = params
	const subpageInfo = useFindHeaderTitle(subpage)

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

export default page
