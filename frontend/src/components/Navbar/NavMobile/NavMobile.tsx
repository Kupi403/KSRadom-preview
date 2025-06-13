import Link from 'next/link'
import { NavMobileItemProps } from '../types'
import NavItem from '../NavItems/NavItem'
import styles from './NavMobile.module.scss'

const NavMobile: React.FC<NavMobileItemProps> = ({ items, isMobileMenuOpen, setIsMobileMenuOpen }) => {
	return (
		<div className={`${styles['navbar-mobile']} ${isMobileMenuOpen ? styles.open : ''}`}>
			{/* <div className={`navbar-mobile open`}> */}
			<ul className={styles.menu}>
				{items.map((link, index) => (
					<li
						key={index}
						className={styles.item}>
						<Link
							href={link.address}
							className={styles.link}
							onClick={!link.subcategories ? () => setIsMobileMenuOpen(false) : undefined}>
							{link.text}
						</Link>
						{link.subcategories && (
							<ul className={styles.submenu}>
								{link.subcategories.map((sub, subIndex) => (
									<li
										key={subIndex}
										className={`${styles.item} ${styles.subitem}`}
										onClick={() => setIsMobileMenuOpen(false)}>
										<a
											href={sub.isExternal ? '' : `${link.address}${sub.address}`}
											className={`${styles.link} ${styles.sublink}`}>
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
