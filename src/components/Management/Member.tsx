//TO BE DONE


import React from 'react'
import styles from './Management.module.scss'
import Image from 'next/image'
import deaultAvatar from '@/../public/default-avatar.photo.jpg'

const Management = () => {
	return (
		<div className={styles.member}>
			<div className={styles.image}>
				<Image
					src={deaultAvatar}
					fill
					alt='avatar'
				/>
			</div>
			<div className={styles.info}>
				<h2>Daniel Maciejewski</h2>
				<strong>Przewodniczący Komisji Sędziowskiej Radom</strong>
                <div className={styles.description}>
                    <p>Były sędzia III ligi, obecnie obserwator II ligi oraz członek Zarządu KSMZPN</p>
                </div>
			</div>
		</div>
	)
}

export default Management
