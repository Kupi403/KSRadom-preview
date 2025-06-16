import { use } from 'react'
import { notFound } from 'next/navigation'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import Aside from '@/components/Aside/Aside'
import { API_URL } from '@/constant/url'
import NewsDetails from '@/components/NewsDetails/NewsDetails'
import { NewsType } from '@/components/News/types'
import fetchSpecificPost from '@/lib/fetch/fetchSpecificPost'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'

type PostPageProps = {
	params: { documentId: string }
}

export default async function PostPage({ params }: PostPageProps) {
	const { documentId } = params

	if (!documentId) {
		return <LoadingSubpage />
	}

	const data = await fetchSpecificPost(documentId.slice(-24))

	if (!data) return notFound()

	return (
		<>
			<SectionContainer priority='main'>{data && <NewsDetails post={data} />}</SectionContainer>
			<Aside />
		</>
	)
}
