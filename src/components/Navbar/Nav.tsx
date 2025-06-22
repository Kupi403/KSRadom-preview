'use client'

import styles from './Nav.module.scss'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/logo2.png'
import { Sling as Hamburger } from 'hamburger-react'
import NavItemsContainer from './NavItems/NavItemsContainer'
import { LEFT_PANEL_LINKS, RIGHT_PANEL_LINKS, ALL_LINKS } from './const'
import NavMobile from './NavMobile/NavMobile'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
	const [headerHeight, setHeaderHeight] = useState<number>(0)
	const [isLogoActive, setIsLogoActive] = useState<boolean>(false)
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	useEffect(() => {
		const header = document.querySelector('header')
		if (header) {
			setHeaderHeight(header.offsetHeight)
		}
	}, [])

	const handleScroll = () => {
		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
		}

		scrollTimeoutRef.current = setTimeout(() => {
			const scrollY = window.scrollY || window.pageYOffset

			setIsLogoActive(scrollY + 20 > headerHeight)
		}, 100)
	}
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current)
			}
		}
	}, [headerHeight])

	useEffect(() => {
		document.documentElement.style.overflow = isMobileMenuOpen ? 'hidden' : ''
	}, [isMobileMenuOpen])

	return (
		<nav className={`${styles.navbar}`}>
			<NavItemsContainer
				type='left'
				items={LEFT_PANEL_LINKS}
			/>

			<div className={`${styles.logo} ${isLogoActive ? styles.scale : ''}`}>
				<Link href='/'>
					<Image
						src={logo.src}
						width={logo.width}
						height={logo.height}
						alt='Logo Komisji Sędziowskej Radom'
						className={styles.image}
					/>
				</Link>
				<span className={`${styles.circle} ${isLogoActive ? styles.active : ''}`}></span>
			</div>

			<div className={styles.burger}>
				<Hamburger
					size={36}
					rounded
					color='#E4C683'
					label='Menu'
					hideOutline={false}
					toggle={setIsMobileMenuOpen}
					toggled={isMobileMenuOpen}
				/>
			</div>

			<NavItemsContainer
				type='right'
				items={RIGHT_PANEL_LINKS}
			/>

			<NavMobile
				items={ALL_LINKS}
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}></NavMobile>
		</nav>
	)
}

export default Navbar
