'use client'

import { useState } from 'react'
import { NavItemProps } from '../types'
import Link from 'next/link'
import Chevron from '@/components/UI/Buttons/Dropdown'
import styles from './NavItems.module.scss'

const NavItem = ({ index, linkItem }: NavItemProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const handleToggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<li
			className={styles.item}
			onMouseEnter={() => handleToggle(index)}
			onMouseLeave={() => handleToggle(0)}>
			<Link
				href={linkItem.address || '#'}
				className={`${styles.link}
				${linkItem.subcategories ? styles.dropdown : ''}`}>
				{linkItem.text}
				{linkItem.subcategories && <Chevron className={styles.img} />}
			</Link>

			{linkItem.subcategories && (
				<ul className={styles.submenu}>
					{linkItem.subcategories.map((subcategory, subIndex) => {
						const subText = typeof subcategory.text === 'string' ? subcategory.text : 'No Text'
						const subAddress = typeof subcategory.address === 'string' ? subcategory.address : '#'
						return (
							<li
								key={subIndex}
								className={styles['submenu-item']}>
								<Link
									href={`${subcategory.isExternal ? '' : linkItem.address}${subAddress}`}
									className={styles['submenu-link']}
									target={subcategory.isExternal ? '_blank' : '_self'}>
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
