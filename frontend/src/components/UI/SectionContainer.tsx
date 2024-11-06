import { PropsWithChildren } from 'react'

import { SectionContainerProps } from '../../types/propsTypes'
import './SectionContainer.scss'

const SectionContainer: React.FC<PropsWithChildren<SectionContainerProps>> = ({ title, priority, children }) => {
	let containerClass
	priority == 'main' ? (containerClass = 'section-container__main') : (containerClass = 'section-container__aside')
	return (
		<section className={`section-container ${containerClass}`}>
			<h2 className='section-container__title'>{title}</h2>
			{children}
		</section>
	)
}

export default SectionContainer
