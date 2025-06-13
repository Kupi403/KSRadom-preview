import { PropsWithChildren } from 'react'

import { SectionContainerProps } from '@/types/propsTypes'
import './SectionContainer.scss'

const SectionContainer: React.FC<PropsWithChildren<SectionContainerProps>> = ({
	priority,
	isMainPage,
	title,
	children,
	subpage,
}) => {
	let containerClass = `section-container__${priority ?? 'main'}`

	if (isMainPage) containerClass += ' background'

	if (subpage) containerClass += ' subpage'

	return (
		<section className={`section-container ${containerClass}`}>
			{title && <h2 className={`${isMainPage ? 'section-container__title' : ''}`}>{title}</h2>}
			<div className='section-container__body'>{children}</div>
		</section>
	)
}

export default SectionContainer
