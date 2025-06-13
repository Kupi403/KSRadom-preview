import NavItem from './NavItem'
import styles from './NavItems.module.scss'
import { NavItemsContainerProps } from '../types'

const NavItemsContainer = ({ type, items }: NavItemsContainerProps) => {
	return (
		<ul className={`${styles.menu} ${styles[type]}`}>
			{items.map((item, id) => (
				<NavItem
					key={id}
					index={id}
					linkItem={item}
				/>
			))}
		</ul>
	)
}

export default NavItemsContainer
