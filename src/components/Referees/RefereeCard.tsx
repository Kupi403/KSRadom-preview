import React from 'react'
import styles from './Referees.module.scss'
import { RefereeCardPropsType } from './types'

const RefereeCard = ({ referee }: RefereeCardPropsType) => {
	return <li className={styles.referee}>{`${referee.surname} ${referee.name}`}</li>
}

export default RefereeCard
