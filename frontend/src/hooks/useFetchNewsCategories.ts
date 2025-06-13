// const [categories, setCategories] = useState<CategoriesType[] | null>(null)
// useEffect(() => {
// 	const fetchCategories = async () => {
// 		const res = await fetch('http://localhost:1337/api/categories')
// 		const data: CategoriesResponseType = await res.json()
// 		const mapped = data.data.map(el => ({
// 			name: el.name,
// 			path: el.path,
// 		}))
// 		setCategories(mapped)
// 	}

// 	fetchCategories()
// }, [])
'use client'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { API_URL } from '@/constant/url'
import { CategoriesResponseType, CategoriesType } from '@/components/News/AllNews/AllNews'

const fetchNewsCategories = async (): Promise<CategoriesResponseType | null> => {
	try {
		const fetchURL = `${API_URL}/categories`

		const response = await fetch(fetchURL)

		if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

		const data = await response.json()

		if (!data?.data) return null

		return data.data
	} catch (error) {
		throw new Error('Failed to fetch download data')
	}
}

const useFetchNewsCategories = (): UseQueryResult<CategoriesType[] | null> => {
	return useQuery({
		queryKey: ['news-categories'],
		queryFn: fetchNewsCategories,
		staleTime: 1000 * 60 * 5,
		retry: 1,
		refetchOnReconnect: false,
	})
}

export default useFetchNewsCategories
