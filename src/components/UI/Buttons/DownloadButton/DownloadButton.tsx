import styles from './DownloadButton.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaDownload } from 'react-icons/fa'
import { DownloadButtonProps } from './types'
import { formatFileSize, getFileIcon } from './utils'

const DownloadButton = ({ children, file, href, isExternal, season, ...props }: DownloadButtonProps) => {
	if (!file.ext) return null

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
						alt={file.ext}
						width={30}
						height={30}
					/>
					{file.ext && <span className={styles.ext}>{file.ext.slice(1)}</span>}
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
				{file.ext && <span className={styles.size}>{fileSize}</span>}
			</div>
		</Link>
	)
}

export default DownloadButton
