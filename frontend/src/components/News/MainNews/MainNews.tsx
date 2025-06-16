import NewsList from '../NewsList'
import { useFetchMainPageNews } from '@/hooks/ReactQuery/useFetchPosts'

const MainNews = () => {
	const {
		data: news,
		isError,
		error,
		isFetching,
		refetch,
	} = useFetchMainPageNews({
		order: 'desc',
		postsPerPage: 5,
	})

	return (
		<NewsList
			news={news?.data}
			isFetching={isFetching}
			isError={isError}
			refetchFn={refetch}
			error={error}
			showMoreLink='/aktualnosci?page=1&sort=desc'
		/>
	)
}

export default MainNews
