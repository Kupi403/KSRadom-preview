import { BlocksContent } from '@strapi/blocks-react-renderer'

export type BaseProps = {
	icon: JSX.Element
	subtitle: string
}

export type EventSubtitleProps =
	| (BaseProps & { text: string; place?: never; description?: never })
	| (BaseProps & { description: BlocksContent; text?: never; place?: never })
	| (BaseProps & {
			place: {
				name: string
				city: string
				street: string
				buildingNumber?: string
			}
			text?: never
			description?: never
	  })
