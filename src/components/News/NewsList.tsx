import styles from './News.module.scss'
import NewsCard from '@/components/UI/NewsCard/NewsCard'
import NewsLoadingBox from '../UI/NewsCard/LoadingNews/NewsLoadingBox'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import ErrorComponent from '../UI/States/Error'
import NoData from '../UI/States/DataState'
import generateComponents from '@/lib/helpers/generateComponents'
import { NewsListProps } from './types'

const NewsList = ({ news, isFetching, isError, error, refetchFn, showMoreLink, subpage }: NewsListProps) => {
	if (isError && error) {
		return (
			<ErrorComponent
				error={error}
				description='Nie udało się pobrać aktualności'
				refetchFn={refetchFn}
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
		</div>
	)
}

export default NewsList
