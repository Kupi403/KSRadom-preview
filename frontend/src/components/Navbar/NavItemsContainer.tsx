import NavItem from './NavItem'

import { NavItemsContainerProps } from '../../types/navTypes'

const NavItemsContainer: React.FC<NavItemsContainerProps> = ({ type, items }) => {
	return (
		<ul className={`navbar__menu navbar__menu--${type}`}>
			{items.map((item, id) => (
				<NavItem
					key={id}
					index={id}
					text={item.text}
					subcategories={item.subcategories}
				/>
			))}
		</ul>
	)
}

export default NavItemsContainer
