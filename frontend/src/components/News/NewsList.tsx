import styles from './News.module.scss'
import NewsCard from '@/components/UI/NewsCard/NewsCard'
import NewsLoadingBox from '../UI/NewsCard/LoadingNews/NewsLoadingBox'
import { NewsResponse } from '@/types/PostType'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import ErrorComponent from '../UI/States/Error'
import NoData from '../UI/States/DataState'
import generateComponents from '@/helpers/generateComponents'
import Error from 'next/error'
import { NewsType } from '@/types/PostType'

interface NewsListProps {
	news: NewsType[] | undefined
	isFetching: boolean
	isError: boolean
	error: any
	refetchFn: () => void
	showMoreLink?: string
	subpage?: boolean
}

const NewsList = ({ news, isFetching, isError, error, refetchFn, showMoreLink, subpage }: NewsListProps) => {
	if (isError) {
		return (
			<ErrorComponent
				refetchFn={refetchFn}
				description='Nie udało się pobrać aktualności.'
				error={error}
			/>
		)
	}
	return (
		<div className={`${styles.news} ${subpage ? styles.subpage : ''}`}>
			{isFetching && generateComponents(NewsLoadingBox, subpage ? 9 : 5, { subpage: subpage })}

			{news && news.length > 0 && !isFetching && !isError && (
				<>
					{news.map(news => (
						<NewsCard
							key={news.documentId}
							news={news}
							subpage={subpage}
						/>
					))}
					{showMoreLink && (
						<div className={styles['show-more']}>
							<CTAButton
								priority='tertiary'
								href={showMoreLink}>
								Więcej aktualności
							</CTAButton>
						</div>
					)}
				</>
			)}

			{news && news.length === 0 && !isError && !isFetching && <NoData message='Brak aktualności' />}

			{isError && error && (
				<ErrorComponent
					error={error}
					description='Nie udało się pobrać aktualności'
					refetchFn={refetchFn}
				/>
			)}
		</div>
	)
}

export default NewsList
