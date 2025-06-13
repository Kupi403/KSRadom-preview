import styles from './UsefulLinks.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { usefulLinks } from '@/constant/usefulLinks'

const UsefulLinks = () => {
	return (
		<div className={styles.links}>
			{usefulLinks.map(link => (
				<Link
					className={styles.link}
					href={link.path}
					target='_blank'
					rel='noreferrer'
					key={link.name}>
					<div className={styles.image}>
						<Image
							src={link.image}
							alt={link.name}
							fill
						/>
					</div>

					<span className={styles.text}>
						{link.name} <FaExternalLinkAlt color='white' />
					</span>
				</Link>
			))}
		</div>
	)
}

export default UsefulLinks
