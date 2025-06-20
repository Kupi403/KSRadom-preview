import NewsList from '../NewsList'
import fetchNews from '@/lib/fetch/fetchNews'

const MainNews = async () => {
	const news = await fetchNews({
		order: 'desc',
		postsPerPage: 5,
		currentPage: 1,
		pagination: false,
	})

	return (
		<NewsList
			news={news?.data ?? []}
			isFetching={false}
			isError={false}
			refetchFn={() => {}}
			error={null}
			showMoreLink='/aktualnosci?page=1&sort=desc'
		/>
	)
}

export default MainNews
