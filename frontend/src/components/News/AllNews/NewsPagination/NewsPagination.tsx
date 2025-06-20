import styles from '../../News.module.scss'
import { useRouter } from 'next/navigation'
import LoadingButton from '@/components/UI/Buttons/Options/LoadingButton'
import Chevron from '@/components/UI/Buttons/Chevron/Chevron'
import { NewsPaginationProps } from '../../types'

const NewsPagination = ({ totalPosts, postsPerPage, currentPage, setCurrentPage, loading }: NewsPaginationProps) => {
	const router = useRouter()
	const totalPages = Math.ceil(totalPosts / postsPerPage)

	if (totalPages < 1) return null

	const handlePageChange = (page: number) => {
		if (currentPage === page) return
		setCurrentPage(page)
		router.push(`/aktualnosci?page=${page}`, { scroll: false })
	}

	const renderPages = () => {
		const pages = []

		if (currentPage > 2) {
			pages.push(
				<button
					key={1}
					className={styles.pageButton}
					onClick={() => handlePageChange(1)}>
					1
				</button>
			)
			if (currentPage > 3)
				pages.push(
					<span
						key='start'
						className={styles.separator}>
						...
					</span>
				)
		}

		for (let page = Math.max(1, currentPage - 1); page <= Math.min(totalPages, currentPage + 1); page++) {
			pages.push(
				<button
					key={page}
					className={page === currentPage ? styles.activePage : styles.pageButton}
					onClick={() => handlePageChange(page)}>
					{page}
				</button>
			)
		}

		if (currentPage < totalPages - 1) {
			if (currentPage < totalPages - 2)
				pages.push(
					<span
						key='end'
						className={styles.separator}>
						...
					</span>
				)
			pages.push(
				<button
					key={totalPages}
					className={styles.pageButton}
					onClick={() => handlePageChange(totalPages)}>
					{totalPages}
				</button>
			)
		}

		return pages
	}

	return (
		<div className={styles.pagination}>
			{loading ? (
				<LoadingButton />
			) : (
				<button
					className={styles.pageButton}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}>
					<Chevron orientation='left' />
				</button>
			)}
			{renderPages()}
			{loading ? (
				<LoadingButton />
			) : (
				<button
					className={styles.pageButton}
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}>
					<Chevron orientation='right' />
				</button>
			)}
		</div>
	)
}

export default NewsPagination
