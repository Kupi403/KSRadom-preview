'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import NewsList from '../NewsList'
import NewsPagination from './NewsPagination/NewsPagination'
import styles from './AllNews.module.scss'
import Options from '../../UI/Buttons/Options/Options'
import ErrorComponent from '@/components/UI/States/Error'
import useFetchNewsCategories from '@/hooks/ReactQuery/useFetchNewsCategories'
import { SortType } from '../types'
import { SORT_OPTIONS } from '../const'
import useFetchNews from '@/hooks/ReactQuery/useFetchNews'
import { generateCategoryOptions } from './utils'
import { AllNewsProps } from './types'
import { POSTS_PER_PAGE } from './const'

const AllNews = ({ initialData }: AllNewsProps) => {
	const { data: categories } = useFetchNewsCategories()

	const categoriesOptions = generateCategoryOptions(categories)

	const searchParams = useSearchParams()
	const router = useRouter()

	const currentPageFromURL = Number(searchParams.get('page')) || 1
	const orderFromURL = (searchParams.get('sort') || 'desc') as SortType
	const categoryFromURL = searchParams.get('category') || ''

	const [currentPage, setCurrentPage] = useState(currentPageFromURL)
	const [order, setOrder] = useState(orderFromURL)
	const [selectedCategory, setSelectedCategory] = useState(categoryFromURL)

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category === selectedCategory ? '' : category)
		setCurrentPage(1)
	}

	const {
		data: news,
		isError,
		error,
		isFetching,
		refetch,
	} = useFetchNews(
		{
			order,
			currentPage,
			postsPerPage: POSTS_PER_PAGE,
			pagination: true,
			category: selectedCategory,
		},
		initialData
	)
	const totalPosts = news?.meta?.pagination?.total ?? 0

	useEffect(() => {
		setCurrentPage(currentPageFromURL)
		setOrder(orderFromURL)
		setSelectedCategory(categoryFromURL)
	}, [searchParams])

	useEffect(() => {
		router.push(
			`/aktualnosci?page=${currentPage}&sort=${order}${selectedCategory ? `&category=${selectedCategory}` : ''}`,
			{ scroll: false }
		)
	}, [currentPage, order, selectedCategory, router])

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}, 0)
	}, [currentPage])

	if (isError) {
		return (
			<ErrorComponent
				refetchFn={refetch}
				error={error}
				description='Błąd pobierania aktualności.'
			/>
		)
	}

	return (
		<>
			<div className={styles.header}>
				{!isError && (
					<div className={styles.options}>
						<Options
							title='Kategoria'
							options={categoriesOptions}
							value={selectedCategory}
							setValue={handleCategoryClick}
							loading={isFetching}
						/>
						<Options
							title='Sortuj'
							options={SORT_OPTIONS}
							value={order}
							setValue={setOrder}
							loading={isFetching}
						/>
					</div>
				)}
			</div>
			<NewsList
				news={news?.data ?? []}
				isFetching={isFetching}
				refetchFn={refetch}
				isError={isError}
				error={error}
				subpage
			/>

			{!isError && (
				<NewsPagination
					totalPosts={totalPosts}
					postsPerPage={POSTS_PER_PAGE}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					loading={isFetching}
				/>
			)}
		</>
	)
}

export default AllNews
