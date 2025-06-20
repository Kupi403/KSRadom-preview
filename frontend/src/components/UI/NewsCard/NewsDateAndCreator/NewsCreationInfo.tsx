import { MdDateRange } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import useSetDate from '@/lib/helpers/setDate'
import styles from './NewsCreationInfo.module.scss'
import { CREATOR_NAME } from '@/constant/fallback'
import { NewsCreationInfoPropsProps } from './types'

const NewsCreationInfo = ({ publishedAt, createdBy }: NewsCreationInfoPropsProps) => {
	const formatedDate = publishedAt ? useSetDate(publishedAt) : useSetDate(new Date().toISOString())
	const name = createdBy ? `${createdBy.firstname} ${createdBy.lastname[0]}.` : CREATOR_NAME

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
