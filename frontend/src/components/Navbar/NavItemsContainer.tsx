import NavItem from './NavItem'

import { NavItemsContainerProps } from '../../types/navTypes'

const NavItemsContainer: React.FC<NavItemsContainerProps> = ({ type, items }) => {
	return (
		<ul className={`navbar__menu navbar__menu--${type}`}>
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
