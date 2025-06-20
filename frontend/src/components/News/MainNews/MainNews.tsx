import useFetchNews from '@/hooks/ReactQuery/useFetchNews'
import NewsList from '../NewsList'

const MainNews = () => {
	const {
		data: news,
		isError,
		error,
		isFetching,
		refetch,
	} = useFetchNews({
		order: 'desc',
		postsPerPage: 5,
		currentPage: 1,
		pagination: false,
	})

	return (
		<NewsList
			news={news?.data ?? []}
			isFetching={isFetching}
			isError={isError}
			refetchFn={refetch}
			error={error}
			showMoreLink='/aktualnosci?page=1&sort=desc'
		/>
	)
}

export default MainNews
