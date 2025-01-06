'use client'

import { useState } from 'react'
import Image from 'next/image'
import { NavItemProps } from '../../types/navTypes'
import dropdown from '../../assets/dropdown.svg'
import Link from 'next/link'

const NavItem: React.FC<NavItemProps> = ({ index, linkItem }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const { text, address, subcategories } = linkItem

	return (
		<li
			className='navbar__item'
			onMouseEnter={() => handleToggle(index)}
			onMouseLeave={() => handleToggle(0)}>
			<Link
				href={linkItem.address || '#'}
				className={linkItem.subcategories ? 'navbar__link navbar__link--dropdown' : 'navbar__link'}>
				{linkItem.text}
				{linkItem.subcategories && (
					<Image
						className='navbar__link--img'
						src={dropdown.src}
						width={dropdown.width}
						height={dropdown.height}
						alt='Dropdown'
					/>
				)}
			</Link>

			{linkItem.subcategories && (
				<ul className='navbar__submenu'>
					{linkItem.subcategories.map((subcategory, subIndex) => {
					
						const subText = typeof subcategory.text === 'string' ? subcategory.text : 'No Text'
						const subAddress = typeof subcategory.address === 'string' ? subcategory.address : '#'
						return (
							<li
								key={subIndex}
								className='navbar__submenu-item'>
								<Link
									// href={subcategory.address}
									href={`${subcategory.isExternal ? '' : linkItem.address}${subAddress}`}
									className='navbar__submenu-link'>
									{/* {subcategory.text} */}
									{subText}
								</Link>
							</li>
						)
					})}
				</ul>
			)}
		</li>
	)
}

export default NavItem
