import { notFound } from 'next/navigation'
import Image from 'next/image'

import SectionContainer from '@/components/UI/SectionContainer'
import styles from '@/styles/layout.module.scss'
import { Post } from '@/types/PostType'
import NewsPage from '@/components/NewsPage/NewsPage'
import CalendarSection from '@/components/Calendar/CalendarSection'
import SubpageSectionContainer from '@/components/UI/SubpageSectionContainer'
import UsefulLinks from '@/components/UsefulLinks/UsefulLinks'
import Aside from '@/components/Aside/Aside'

async function getPostData(documentId: string): Promise<Post | null> {
	try {
		const response = await fetch(
			`http://localhost:1337/api/posts/${documentId}?populate=*`,
			{ next: { revalidate: 60 } } // Opcjonalne cachowanie w Next.js
		)
		if (!response.ok) return null

		const data = await response.json()
		console.log(data.data)
		return {
			id: data.data.id,
			documentId: data.data.documentId,
			title: data.data.title,
			description: data.data.description,
			thumbnail: data.data.thumbnail,
			categories: data.data.categories,
			files: data.data.files,
			media: data.data.media,
			createdAt: data.data.createdAt,
			updatedAt: data.data.updatedAt,
			createdBy: data.data.createdBy,
		}
	} catch (error) {
		console.error('Error fetching post data:', error)
		return null
	}
}

interface PostPageProps {
	params: { documentId: string }
}

export default async function PostPage({ params }: PostPageProps) {
	const { documentId } = await params
	const post = await getPostData(documentId.slice(-24))

	if (!post) {
		notFound()
	}


	return (
		<main className={styles.main + ' ' + styles.main__subpage}>
			<SectionContainer
				priority='main'
				subpage>
				<NewsPage post={post} />
			</SectionContainer>

			<Aside />
			{/* <aside className={styles.aside}>
				<SectionContainer
					priority='aside'
					subpage
					isMainPage
					title='Kalendarz'>
					<CalendarSection />
				</SectionContainer>
				<SectionContainer
					priority='aside'
					subpage
					isMainPage
					title='Przydatne linki'>
					<UsefulLinks />
				</SectionContainer>
			</aside> */}

			{/* <SubpageSectionContainer priority='main'>
				<NewsPage post={post} />
			</SubpageSectionContainer>
			<SubpageSectionContainer
				isMainPage
				title='Kalendarz'>
				<CalendarSection />
			</SubpageSectionContainer> */}
		</main>
	)
}
