import React from 'react'
import styles from './DownloadButton.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import { FaDownload } from 'react-icons/fa'
import { FileType } from '@/types/PostType'
import { SeasonsType } from '@/hooks/ReactQuery/useFetchSeasons'

type DownloadButtonProps = {
	file: FileType
	children: React.ReactNode
	href: string
	season?: SeasonsType
	isExternal?: boolean
} & React.ComponentPropsWithoutRef<'button'> &
	React.ComponentPropsWithoutRef<'a'>

export const formatFileSize = (sizeInKB: number): string => {
	const sizeInBytes = sizeInKB * 1024

	if (sizeInBytes >= 1_000_000_000) {
		return `${(sizeInBytes / 1_000_000_000).toFixed(2)} GB`
	} else if (sizeInBytes >= 1_000_000) {
		return `${(sizeInBytes / 1_000_000).toFixed(2)} MB`
	} else if (sizeInBytes >= 1_000) {
		return `${(sizeInBytes / 1_000).toFixed(2)} KB`
	} else {
		return `${sizeInBytes} B`
	}
}

export const getFileIcon = (ext: string): string => {
	const cleanedExt = ext.replace('.', '').toLowerCase()

	const knownExtensions = ['pdf', 'docx', 'doc', 'txt', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'mp3', 'mp4']

	if (knownExtensions.includes(cleanedExt)) {
		return `/icons/files/${cleanedExt}.svg`
	}
	return '/icons/files/pdf.svg'
}

const DownloadButton = ({ children, file, href, isExternal, season, ...props }: DownloadButtonProps) => {
	const fileSize = formatFileSize(file.size)
	const iconSrc = getFileIcon(file.ext)
	return (
		<Link
			href={href}
			className={styles['download-button']}
			aria-label='Download button'
			target={isExternal ? '_blank' : '_self'}
			{...props}
			download={href}>
			<div className={styles.info}>
				<div className={styles.icon}>
					<Image
						src={iconSrc}
						alt={file.name}
						width={30}
						height={30}
					/>
					<span className={styles.ext}>{file.ext.slice(1)}</span>
				</div>

				<div className={styles.name}>
					<span className={styles.title}>{children}</span>
					{season && <span className={styles.season}>{season.name}</span>}
				</div>
			</div>
			<div className={styles.download}>
				<span className={styles.icon}>
					<FaDownload />
				</span>
				<span className={styles.size}>{fileSize}</span>
			</div>
		</Link>
	)
}

export default DownloadButton
