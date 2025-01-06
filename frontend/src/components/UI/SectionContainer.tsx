import { PropsWithChildren } from 'react'

import { SectionContainerProps } from '../../types/propsTypes'
import './SectionContainer.scss'

const SectionContainer: React.FC<PropsWithChildren<SectionContainerProps>> = ({
	isMainPage,
	title,
	priority,
	children,
	subpage,
}) => {
	let containerClass
	priority == 'main' ? (containerClass = 'section-container__main') : (containerClass = 'section-container__aside')
	return (
		<section
			className={`section-container ${containerClass} ${isMainPage ? 'section-container-main-page' : ''} ${
				subpage ? 'section-container__subpage' : ''
			}`}>
			{isMainPage ? <h2 className='section-container__title'>{title}</h2> : <h3>{title}</h3>}
			{children}
		</section>
	)
}

export default SectionContainer
