import { useEffect, useState } from 'react'
import './MainHeader.scss'
import i1 from '../../assets/hero-1.jpg'
import i2 from '../../assets/hero-2.jpg'
import i3 from '../../assets/hero-3.jpg'
import i4 from '../../assets/hero-4.jpg'
import i5 from '../../assets/hero-5.jpg'


// import { motion, useScroll } from 'framer-motion'

const MainHeader = () => {
	const images = [i1, i2, i3, i4, i5]

	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
		}, 5000)

		return () => clearInterval(interval)
	}, [images.length])

	return (
		<header className='header'>
			{images.map((image, index) => {
				return (
					<div
						key={index}
						className='header__hero'
						style={{
							backgroundImage: `url(${image})`,
							opacity: index === currentImageIndex ? 1 : 0,
							zIndex: index === currentImageIndex ? -2 : -3,
						}}
					/>
				)
			})}

			<div className='header__hero--shadow'></div>

			<h1 className='header__title'>
				<span>komisja sędziowska </span> radom
			</h1>
		</header>
	)
}

export default MainHeader
