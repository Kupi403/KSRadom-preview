import React, { useMemo } from 'react'
import { ALL_LINKS } from '@/components/Navbar/const'
import styles from './SubpageManager.module.scss'
import CTAButton from '../UI/Buttons/CTA/CTAButton'
const SubpageManager = ({ name }: { name: string }) => {
	const filteredSubpages = useMemo(() => {
		return ALL_LINKS.filter(link => link.text.toLowerCase() === name.toLowerCase())
	}, [name])

	return (
		<div className={styles.manager}>
			<h3>Dostępne podstrony:</h3>

			{filteredSubpages && filteredSubpages.length > 0 && (
				<div className={styles.links}>
					{filteredSubpages.map(el =>
						el.subcategories?.map(sub => {
							return (
								<div className={styles.link}>
									<CTAButton
										priority='tertiary'
										isExternal={sub.isExternal}
										href={sub.isExternal ? sub.address : `${el.address}${sub.address}`}>
										{sub.text}
									</CTAButton>
								</div>
							)
						})
					)}
				</div>
			)}
			{!name ||
				!filteredSubpages ||
				(filteredSubpages.length === 0 && (
					<div className={styles.empty}>
						<p>Brak</p>
						<CTAButton
							priority='error'
							href='/'>
							Powrót na stronę główną
						</CTAButton>
					</div>
				))}
		</div>
	)
}

export default SubpageManager
