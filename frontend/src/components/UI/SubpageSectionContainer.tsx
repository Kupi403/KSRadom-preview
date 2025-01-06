import { PropsWithChildren } from 'react'

import { SectionContainerProps, SubpageSectionContainerProps } from '../../types/propsTypes'
import './SectionContainer.scss'

const SectionContainer: React.FC<PropsWithChildren<SubpageSectionContainerProps>> = ({
	isMainPage,
	title,
	children,
}) => {
	return (
		<section className={`section-container section-container__subpage`}>
			{isMainPage ? <h2 className='section-container__title'>{title}</h2> : <h3>{title}</h3>}
			{children}
		</section>
	)
}

export default SectionContainer
