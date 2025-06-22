import React from 'react'
import CTAButton from '../Buttons/CTA/CTAButton'
import styles from './States.module.scss'
import { IoMdRefresh } from 'react-icons/io'
import errorIllustration from '@/../public/error.svg'
import Image from 'next/image'
import { ErrorStateProps } from './types'

const ErrorComponent = ({ description, refetchFn }: ErrorStateProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.illustration}>
				<Image
					src={errorIllustration}
					alt='Błąd'
					fill
				/>
			</div>
			<p>{description}</p>
			<CTAButton
				priority='error'
				onClick={refetchFn}>
				Spróbuj ponownie
				<IoMdRefresh />
			</CTAButton>
		</div>
	)
}

export default ErrorComponent
