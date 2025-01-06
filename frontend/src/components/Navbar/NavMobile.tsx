import { NavMobileItemProps } from '../../types/navTypes'
import NavItem from './NavItem'
import './NavMobile.scss'

const NavMobile: React.FC<NavMobileItemProps> = ({ items, isMobileMenuOpen, setIsMobileMenuOpen }) => {
	return (
		<div className={`navbar-mobile ${isMobileMenuOpen ? 'open' : undefined}`}>
		{/* <div className={`navbar-mobile open`}> */}
			<ul className='navbar-mobile__menu'>
				{items.map((link, index) => (
					<li
						key={index}
						className='navbar-mobile__menu--item'>
						<a
							href='#'
							className='navbar-mobile__menu--link'
							onClick={!link.subcategories ? () => setIsMobileMenuOpen(false) : undefined}>
							{link.text}
						</a>
						{link.subcategories && (
							<ul className='navbar-mobile__submenu'>
								{link.subcategories.map((sub, subIndex) => (
									<li
										key={subIndex}
										className='navbar-mobile__menu--item navbar-mobile__submenu--item'
										onClick={() => setIsMobileMenuOpen(false)}>
										<a
											href={sub.address}
											className='navbar-mobile__menu--link navbar-mobile__submenu--link'>
											{sub.text}
										</a>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
		// <nav className='navbar-mobile'>
		// 	{items.map((item, index) => (
		// 		<NavItem
		// 			key={index}
		// 			index={index}
		// 			text={item.text}
		// 			subcategories={item.subcategories}
		// 		/>
		// 	))}
		// </nav>
	)
}

export default NavMobile
