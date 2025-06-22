'use client'
import styles from './SlideUp.module.scss'
import Chevron from '../Chevron/Chevron'
import { useEffect, useState } from 'react'

const SlideUpButton = () => {
	const [isVisible, setIsVisible] = useState(false)

	const checkScroll = () => {
		if (!isVisible && window.pageYOffset > 400) {
			setIsVisible(true)
		} else if (isVisible && window.pageYOffset <= 400) {
			setIsVisible(false)
		}
	}
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		window.addEventListener('scroll', checkScroll)
		return () => window.removeEventListener('scroll', checkScroll)
	}, [isVisible])

	return (
		<button
			className={`${styles['slide-up-button']} ${isVisible ? styles.visible : ''}`}
			onClick={scrollToTop}
			aria-label='Przewiń do góry'>
			<Chevron orientation='up' />
		</button>
	)
}

export default SlideUpButton
