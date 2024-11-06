import { useState } from 'react'

import { NavItemProps } from '../../types/navTypes'
import dropdown from '../../assets/dropdown.svg'

const NavItem: React.FC<NavItemProps> = ({ text, index, address, subcategories }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}
	return (
		<li
			className='navbar__item'
			onMouseEnter={() => handleToggle(index)}
			onMouseLeave={() => handleToggle(0)}>
			<a
				href={address || '#'}
				className={subcategories ? 'navbar__link navbar__link--dropdown' : 'navbar__link'}>
				{text}
				{subcategories && (
					<img
						className='navbar__link--img'
						src={dropdown}
						alt='Dropdown'
					/>
				)}
				{/*   */}
				{subcategories && (
					<>
						<ul className='navbar__submenu'>
							{subcategories.map((subcategory, subIndex) => (
								<li
									key={subIndex}
									className='navbar__submenu-item'>
									<a
										href='#'
										className='navbar__submenu-link'>
										{subcategory}
									</a>
								</li>
							))}
						</ul>
					</>
				)}
			</a>
		</li>
	)
}

export default NavItem
