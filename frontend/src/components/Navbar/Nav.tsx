import './Nav.scss'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo2.png'
import { Sling as Hamburger } from 'hamburger-react'
import NavItemsContainer from './NavItemsContainer'
import { NavItemSubcategory } from '../../types/navTypes'
import NavMobile from './NavMobile'
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


	// const [clientRect, setClientRect] = useState<DOMRect | null>(null)
	// const [isScrolling, setIsScrolling] = useState<boolean>(false)

	// const handleScroll = () => {
	// 	let timeout: number
	// 	window.clearTimeout(timeout)
	// 	if (!isScrolling)
	// 		timeout = window.setTimeout(() => {
	// 			setClientRect(document.body.getBoundingClientRect())
	// 		}, 500)
	// }

	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll)

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll)
	// 	}
	// }, [])

	// useEffect(() => {
	// 	if (clientRect) console.log(clientRect)
	// }, [clientRect])

	useEffect(() => {
		isMobileMenuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto')
	}, [])

	const leftPanelLinks: NavItemSubcategory[] = [
		{
			text: 'aktualności',
		},
		{ text: 'organizacja', subcategories: ['zarząd', 'sędziowie', 'obserwatorzy'] },
		{ text: 'obsada' },
		{ text: 'szkolenie', subcategories: ['testy pisemne', 'Przepisy Gry', 'klipy UEFA', 'FAQ dla kandydatów'] },
	]

	const rightPanelLinks: NavItemSubcategory[] = [
		{ text: 'do pobrania', subcategories: ['zarząd', 'sędziowie', 'obserwatorzy'] },
		{ text: 'zostań sędzią' },
		{ text: 'kontakt' },
	]

	return (
		<nav className='navbar'>
			<NavItemsContainer
				type='left'
				items={leftPanelLinks}
			/>

			<div className={`navbar__logo ${clientRect && clientRect.top < -800 ? 'navbar__logo--active' : ''}`}>
				<a href='#'>
					<img
						src={logo}
						alt='Logo Komisji Sędziowskej Radom'
						className='navbar__logo--image'
					/>
				</a>
				<span className={`navbar__logo--circle ${clientRect && clientRect.top < -800 ? 'navbar__logo--circle--active' : ''}`}></span>
			</div>

			{/* <ThemeButton></ThemeButton> */}

			<div className='nav__buger'>
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
