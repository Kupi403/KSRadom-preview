import React from 'react'

import { NavItemProps } from '../../types/navTypes'
import dropdown from '../../assets/dropdown.svg'

const NavItem: React.FC<NavItemProps> = ({ text, address, subcategories }) => {
	return (
		<li className='navbar__item'>
			<a
				href={address || '#'}
				className='navbar__link'>
				{text}
				{subcategories && (
					<img
						src={dropdown}
						alt='Dropdown'
					/>
				)}
			</a>
		</li>
	)
}

export default NavItem
