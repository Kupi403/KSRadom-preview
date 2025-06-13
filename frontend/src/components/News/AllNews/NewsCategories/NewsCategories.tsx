import useFetchCategories from '@/hooks/useFetchCategories'
import styles from './NewsCategories.module.scss'
import { useRef, useState, MouseEvent, TouchEvent, WheelEvent, useEffect } from 'react'

type NewsCategoriesProps = {
	selectedCategory: string | null
	handleCategoryClick: (category: string) => void
}

const NewsCategories = ({ selectedCategory, handleCategoryClick }: NewsCategoriesProps) => {
	const { data } = useFetchCategories()

	const sliderRef = useRef<HTMLDivElement | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [isButtonDragged, setIsButtonDragged] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	const handleWheelScroll = (event: WheelEvent<HTMLDivElement>) => {
		if (sliderRef.current) {
			sliderRef.current.scrollLeft += event.deltaY
		}
	
	}

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		if (sliderRef.current) {
			setIsDragging(true)
			setStartX(event.pageX - sliderRef.current.offsetLeft)
			setScrollLeft(sliderRef.current.scrollLeft)
		}
	}

	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		if (!isDragging || !sliderRef.current) return
		event.preventDefault()
		const x = event.pageX - sliderRef.current.offsetLeft
		const walk = (x - startX) * 1
		sliderRef.current.scrollLeft = scrollLeft - walk
		
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	const handleMouseLeave = () => {
		setIsDragging(false)
		setIsButtonDragged(false)
	}

	const handleTouchEnd = (category: { name: string }) => {
		if (isButtonDragged) {
			setIsButtonDragged(false)
			return
		}
		handleCategoryClick(category.name)
		console.log('touch end')
	}

	const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
		const slider = sliderRef.current as HTMLDivElement & { startX?: number }
		if (slider) {
			slider.startX = event.touches[0].clientX
			slider.scrollLeft = slider.scrollLeft
		}
		console.log('touch start')
	}

	const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
		const slider = sliderRef.current as HTMLDivElement & { startX?: number }
		if (!slider?.startX || !slider.scrollLeft) return

		const diff = event.touches[0].clientX - slider.startX
		slider.scrollLeft = slider.scrollLeft - diff
	}

	useEffect(() => {
		console.log(`czy klawisz jest + ${isButtonDragged}`)
	}, [isButtonDragged])

	return (
		<div className={styles.categories}>
			<p className={styles.header}>Kategorie:</p>
			<div
				className={styles.container}
				ref={sliderRef}
				onWheel={handleWheelScroll}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
				{data?.data?.map(category => {
					return (
						<button
							key={category.id}
							onClick={() => handleTouchEnd(category)}
							className={`${styles.category} ${category.name === selectedCategory ? styles.active : ''}`}>
							{category.name}
						</button>
					)
				})}
			</div>
		</div>
	)
}

export default NewsCategories
