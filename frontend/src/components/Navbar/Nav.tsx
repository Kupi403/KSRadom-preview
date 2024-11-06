import './Nav.scss'
import logo from '../../assets/logo2.png'
import { Sling as Hamburger } from 'hamburger-react'
import NavItemsContainer from './NavItemsContainer'
import { NavItemSubcategory } from '../../types/navTypes'
// import ThemeButton from '../UI/Buttons/ThemeButton'
const Navbar = () => {
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

			<div className='navbar__logo'>
				<a href='#'>
					<img
						src={logo}
						alt='Logo Komisji Sędziowskej Radom'
						className='navbar__logo--image'
					/>
				</a>
				<span className='navbar__logo--circle'></span>
			</div>

			{/* <ThemeButton></ThemeButton> */}

			<Hamburger
				size={36}
				rounded
				color='#f5f5f5'
				label='Menu'
				hideOutline={false}
			/>

			<NavItemsContainer
				type='right'
				items={rightPanelLinks}
			/>
		</nav>
	)
}

export default Navbar
