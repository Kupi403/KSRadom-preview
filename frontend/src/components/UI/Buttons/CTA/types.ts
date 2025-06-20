export type CTAButtonProps = {
	priority: 'primary' | 'secondary' | 'tertiary' | 'error'
	children: React.ReactNode
	href?: string
	isExternal?: boolean
} & React.ComponentPropsWithoutRef<'button'> &
	React.ComponentPropsWithoutRef<'a'>
