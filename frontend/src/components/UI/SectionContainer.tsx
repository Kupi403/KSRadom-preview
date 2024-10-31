import { PropsWithChildren } from 'react'

import { SectionContainerProps } from '../../types/propsTypes'
import './SectionContainer.scss'

const SectionContainer: React.FC<PropsWithChildren<SectionContainerProps>> = ({ title, width, children }) => {
	return (
		<section
			style={{ width: width }}
			className='section-container'>
			<h2 className='section-container__title'>{title}</h2>
			{children}
		</section>
	)
}

export default SectionContainer
