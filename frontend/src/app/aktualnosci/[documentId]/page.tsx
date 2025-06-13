import { notFound } from 'next/navigation'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import NewsDetails from '@/components/News/NewsDetails/NewsDetails'
import Aside from '@/components/Aside/Aside'
import { NewsType } from '@/types/newsType'
import { API_URL } from '@/constant/url'

interface PostPageProps {
	params: { documentId: string }
}
export default async function PostPage({ params }: PostPageProps) {
	if (!params.documentId) {
		return <p>Ładowanie...</p>
	}

	const data = await fetchPost(params.documentId.slice(-24))

	if (!data) return notFound()

	return (
		<>
			<SectionContainer priority='main'>{data && <NewsDetails post={data} />}</SectionContainer>

			<Aside />
		</>
	)
}

const fetchPost = async (documentId: string): Promise<NewsType | null> => {
	try {
		const response = await fetch(`${API_URL}/posts/${documentId}?populate=*`)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
		const data = await response.json()
		if (!data?.data) return null

		return {
			id: data.data.id,
			documentId: data.data.documentId,
			title: data.data.title,
			description: data.data.description,
			newDescription: data.data.newDescription ? data.data.newDescription : undefined,
			thumbnail: data.data.thumbnail,
			categories: data.data.categories,
			files: data.data.files,
			media: data.data.media,
			createdAt: data.data.createdAt,
			updatedAt: data.data.updatedAt,
			createdBy: data.data.createdBy,
		}
	} catch (error) {
		throw new Error('Failed to fetch post data')
	}
}
