import React from 'react'
import { URL } from '@/constant/url'
import styles from '../NewsDetails.module.scss'
import DownloadButton from '@/components/UI/Buttons/DownloadButton/DownloadButton'
import { FileType } from '@/components/News/types'

const NewsFiles = ({ files }: { files: FileType[] }) => {
	if (!files || files.length === 0) return null
	return (
		<div className={styles.assets}>
			<p className={styles.subtitle}>Pliki do pobrania:</p>
			<div className={styles['download-items']}>
				{files.map(file => {
					return (
						<DownloadButton
							file={file}
							key={file.id}
							href={`${URL}${file.url}`}>
							{file.name}
						</DownloadButton>
					)
				})}
			</div>
		</div>
	)
}

export default NewsFiles
