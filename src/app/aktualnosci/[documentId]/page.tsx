import { notFound } from 'next/navigation'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import Aside from '@/components/Aside/Aside'
import NewsDetails from '@/components/NewsDetails/NewsDetails'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import fetchNewsDetails from '@/lib/fetch/fetchNewsDetails'

type PostPageProps = { params: Promise<{ documentId: string }> }

export default async function PostPage({ params }: PostPageProps) {
	const { documentId } = await params

	if (!documentId) {
		return <LoadingSubpage />
	}
	const data = await fetchNewsDetails(documentId.slice(-24))

	if (!data) return notFound()

	return (
		<>
			<SectionContainer priority='main'>{data && <NewsDetails post={data} />}</SectionContainer>
			<Aside />
		</>
	)
}
