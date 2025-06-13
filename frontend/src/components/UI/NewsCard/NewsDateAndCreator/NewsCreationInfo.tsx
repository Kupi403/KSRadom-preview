import React from 'react'
import { MdDateRange } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import useSetDate from '@/helpers/useSetDate'
import styles from './NewsCreationInfo.module.scss'

type NewsCreationInfoPropsProps = {
	publishedAt: string
	createdBy?: {
		firstname: string
		lastname: string
	}
	newsDetails?: boolean
}
console.log(styles)
const NewsCreationInfo = ({ publishedAt, createdBy }: NewsCreationInfoPropsProps) => {
	const formatedDate = useSetDate(publishedAt)
	const name = `${createdBy ? createdBy.firstname : 'KS'} ${createdBy ? createdBy.lastname[0] : 'Radom'}.`

	return (
		<div className={styles['creation-info']}>
			<p className={styles.box}>
				<MdDateRange color='#797979' /> {formatedDate}
			</p>
			<p className={styles.box}>
				<FaUser color='#797979' /> {name}
			</p>
		</div>
	)
}

export default NewsCreationInfo
