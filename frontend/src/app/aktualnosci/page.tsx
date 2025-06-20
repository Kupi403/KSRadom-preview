import { fetchNews } from '@/lib/fetch/fetchNews'
import AllNews from '@/components/News/AllNews/AllNews'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import { POSTS_PER_PAGE } from '@/components/News/AllNews/const'
import { Suspense } from 'react'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'

export const metadata = {
	title: 'Aktualności | Komisja Sędziowska Radom',
	description:
		'Bądź na bieżąco z aktualnościami Komisji Sędziowskiej Radom, śledź wydarzenia, informacje i ogłoszenia.',
}

export default async function AllNewsPage() {
	const initialData = await fetchNews({
		order: 'desc',
		currentPage: 1,
		postsPerPage: POSTS_PER_PAGE,
		pagination: true,
	})

	return (
		<SectionContainer
			title='Aktualności'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<AllNews initialData={initialData} />
			</Suspense>
		</SectionContainer>
	)
}
