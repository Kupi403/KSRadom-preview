import { ComponentType } from 'react'

export const generateComponents = (Component: ComponentType<any>, amount = 3, props = {}) => {
	return Array.from({ length: amount }, (_, idx) => (
		<Component
			key={idx}
			{...props}
		/>
	))
}

export default generateComponents
