import React from 'react'
import styles from './CTAButton.module.scss'
import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

type CTAButtonProps = {
	priority: 'primary' | 'secondary' | 'tertiary' | 'error'
	children: React.ReactNode
	href?: string
	isExternal?: boolean
} & React.ComponentPropsWithoutRef<'button'> &
	React.ComponentPropsWithoutRef<'a'>

const CTAButton = ({ priority, children, href, isExternal, ...props }: CTAButtonProps) => {
	return href ? (
		<Link
			href={href}
			className={`${styles['cta-button']} ${styles.effect} ${styles[priority]}`}
			aria-label='Call to Action Button'
			target={isExternal ? '_blank' : '_self'}
			{...props}>
			<span className={styles.icon}>
				{isExternal && (
					<span>
						<FaExternalLinkAlt />
					</span>
				)}

				{children}
			</span>
		</Link>
	) : (
		<button
			className={`${styles['cta-button']} ${styles[priority]}`}
			aria-label='Call to Action Button'
			{...props}>
			{priority === 'error' ? <span className={styles.icon}>{children}</span> : children}
		</button>
	)
}

export default CTAButton
