import Link from 'next/link'
import { NavMobileItemProps } from '../types'
import styles from './NavMobile.module.scss'
import { useEffect } from 'react'

const NavMobile: React.FC<NavMobileItemProps> = ({ items, isMobileMenuOpen, setIsMobileMenuOpen }) => {
	useEffect(() => {
		if (isMobileMenuOpen) {
		}
	}, [isMobileMenuOpen])
	return (
		<div className={`${styles['navbar-mobile']} ${isMobileMenuOpen ? styles.open : ''}`}>
			<ul className={styles.menu}>
				{items.map((link, index) => (
					<li
						key={index}
						className={styles.item}>
						<Link
							href={link.address}
							className={styles.link}
							onClick={() => setIsMobileMenuOpen(false)}>
							{link.text}
						</Link>
						{link.subcategories && (
							<ul className={styles.submenu}>
								{link.subcategories.map((sub, subIndex) => (
									<li
										key={subIndex}
										className={`${styles.item} ${styles.subitem}`}
										onClick={() => setIsMobileMenuOpen(false)}>
										<Link
											href={sub.isExternal ? sub.address : `${link.address}${sub.address}`}
											className={`${styles.link} ${styles.sublink}`}>
											{sub.text}
										</Link>
									</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

export default NavMobile
