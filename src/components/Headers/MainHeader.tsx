'use client'
import { useEffect, useState } from 'react'
import styles from './MainHeader.module.scss'
import i1 from '@/assets/images/hero-1.jpg'
import i7 from '@/assets/images/hero-7.jpg'
import i3 from '@/assets/images/hero-3.jpg'
import i4 from '@/assets/images/hero-4.jpg'
import i8 from '@/assets/images/hero-8.jpg'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import type { StaticImageData } from 'next/image'

const MainHeader = () => {
	const [images, setImages] = useState<StaticImageData[]>([])
	useEffect(() => {
		const images = [i1, i7, i3, i4, i8].sort(() => Math.random() - 0.5)
		setImages(images)
	}, [])

	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [images.length])

	return (
		<header className={styles.header}>
			{images.map((image, index) => {
				return (
					<div
						key={index}
						className={styles.hero}
						style={{
							backgroundImage: `url(${image.src})`,
							opacity: index === currentImageIndex ? 1 : 0,
							zIndex: index === currentImageIndex ? -2 : -3,
						}}
					/>
				)
			})}
			<div className={styles.shadow}></div>

			<h1 className={styles.title}>
				<span className={styles.first}>komisja sędziowska</span> <span className={styles.second}>radom</span>
			</h1>

			<div className={styles.buttons}>
				<CTAButton
					priority='primary'
					href={'/aktualnosci?page=1&sort=desc&category=obsada'}>
					Obsada
				</CTAButton>
				<CTAButton
					priority='secondary'
					href={'/kalendarz'}>
					Kalendarz
				</CTAButton>
			</div>
		</header>
	)
}

export default MainHeader
