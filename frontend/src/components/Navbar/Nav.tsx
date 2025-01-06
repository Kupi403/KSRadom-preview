'use client'

import './Nav.scss'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/logo2.png'
import { Sling as Hamburger } from 'hamburger-react'
import NavItemsContainer from './NavItemsContainer'
import { NavItemSubcategory } from '../../types/navTypes'
import NavMobile from './NavMobile'
import Image from 'next/image'
import Link from 'next/link'
// import ThemeButton from '../UI/Buttons/ThemeButton'
const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

	const [clientRect, setClientRect] = useState<DOMRect | null>(null)
	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const handleScroll = () => {
		// Jeśli timer jest ustawiony, wyczyść go (czyli przerywamy poprzednie odczyty)
		if (scrollTimeoutRef.current) {
			clearTimeout(scrollTimeoutRef.current)
		}

		// Ustaw nowy timer - .5s (500ms) po ostatnim przewinięciu
		scrollTimeoutRef.current = setTimeout(() => {
			const rect = document.documentElement.getBoundingClientRect()
			setClientRect(rect)
		}, 500)
	}

	useEffect(() => {
		// Dodaj event listener na scroll
		window.addEventListener('scroll', handleScroll)

		// Wyczyść event listener przy odmontowaniu komponentu
		return () => {
			window.removeEventListener('scroll', handleScroll)
			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current)
			}
		}
	}, [])

	useEffect(() => {
		isMobileMenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
	}, [])

	const leftPanelLinks: NavItemSubcategory[] = [
		{
			text: 'aktualności',
			address: '/aktualnosci',
		},
		{
			text: 'organizacja',
			address: '/organizacja',
			subcategories: [
				{ text: 'zarząd', address: '/zarzad' },
				{ text: 'sędziowie', address: '/sedziowie' },
				{ text: 'obserwatorzy', address: '/obserwatorzy' },
			],
		},
		{ text: 'obsada', address: '/obsada' },
		{
			text: 'szkolenie',
			address: '/szkolenie',
			subcategories: [
				{ text: 'testy pisemne', address: '/testy-pisemne' },
				{ text: 'Przepisy Gry', address: '/przepisy-gry' },
				{ text: 'klipy UEFA', address: 'https://uefaclips.eu', isExternal: true },
				{ text: 'FAQ dla kandydatów', address: '/faq' },
			],
		},
	]

	const rightPanelLinks: NavItemSubcategory[] = [
		{
			text: 'do pobrania',
			address: '/do-pobrania',
			subcategories: [
				{ text: 'regulaminy', address: '/regulaminy' },
				{ text: 'licencje', address: '/licencje' },
				{ text: 'dokumenty meczowe', address: '/dokumenty-meczowe' },
				{ text: 'egzaminy kondycyjne', address: '/egzaminy-kondycyjne' },
			],
		},
		{ text: 'zostań sędzią', address: '/zostan-sedzia' },
		{ text: 'kontakt', address: '/kontakt' },
	]

	return (
		<nav className='navbar'>
			<NavItemsContainer
				type='left'
				items={leftPanelLinks}
			/>

			<div className={`navbar__logo ${clientRect && clientRect.top < -800 ? 'navbar__logo--active' : ''}`}>
				<Link href='/'>
					<Image
						src={logo.src}
						width={logo.width}
						height={logo.height}
						alt='Logo Komisji Sędziowskej Radom'
						className='navbar__logo--image'
					/>
				</Link>
				<span
					className={`navbar__logo--circle ${
						clientRect && clientRect.top < -800 ? 'navbar__logo--circle--active' : ''
					}`}></span>
			</div>

			{/* <ThemeButton></ThemeButton> */}

			<div className='nav__burger'>
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
				items={rightPanelLinks}
			/>

			<NavMobile
				items={[...leftPanelLinks, ...rightPanelLinks]}
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}></NavMobile>
		</nav>
	)
}

export default Navbar
