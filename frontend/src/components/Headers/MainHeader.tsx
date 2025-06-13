'use client'
import { useEffect, useState } from 'react'
import styles from './MainHeader.module.scss'
import i1 from '@/assets/images/hero-1.jpg'
import i2 from '@/assets/images/hero-2.jpg'
import i3 from '@/assets/images/hero-3.jpg'
import i4 from '@/assets/images/hero-4.jpg'
import i5 from '@/assets/images/hero-5.jpg'
import i6 from '@/assets/images/hero-6.jpg'
import i7 from '@/assets/images/hero-7.jpg'
import i8 from '@/assets/images/hero-8.jpg'
import i9 from '@/assets/images/hero-9.jpg'
import i10 from '@/assets/images/hero-10.jpg'
import i11 from '@/assets/images/hero-11.jpg'
import i12 from '@/assets/images/hero-12.jpg'
import i13 from '@/assets/images/hero-13.jpg'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
import type { StaticImageData } from 'next/image'

const MainHeader = () => {
	const [images, setImages] = useState<StaticImageData[]>([])
	useEffect(() => {
		const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13].sort(() => Math.random() - 0.5)
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
					priority='secondary'
					href={'/aktualnosci?page=1&sort=desc'}>
					Aktualności
				</CTAButton>
				<CTAButton
					priority='primary'
					href={'/aktualnosci?page=1&sort=desc&category=obsada'}>
					Obsada
				</CTAButton>
			</div>
		</header>
	)
}

export default MainHeader
