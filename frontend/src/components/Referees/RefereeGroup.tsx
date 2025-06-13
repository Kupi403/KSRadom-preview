import { useEffect, useState } from 'react'
import RefereeCard from './RefereeCard'
import styles from './Referees.module.scss'
import { RefereeGroupPropsType } from './types'

const RefereeGroup = ({ leagueName, referees }: RefereeGroupPropsType) => {
	const [shouldAnimate, setShouldAnimate] = useState(false)

	useEffect(() => {
		setShouldAnimate(false)

		const timeout = setTimeout(() => {
			setShouldAnimate(true)
		}, 10)
		return () => clearTimeout(timeout)
	}, [referees])

	return (
		<div
			className={`${styles.group} ${shouldAnimate && styles.appear}`}
			data-league={leagueName}>
			<div className={styles.league}>
				<h3>{leagueName}</h3>
			</div>
			<ol className={styles.referees}>
				{referees.map((ref, idx) => (
					<RefereeCard
						key={idx}
						referee={ref}
						idx={idx}
					/>
				))}
			</ol>
		</div>
	)
}

export default RefereeGroup
