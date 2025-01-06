import pzpn from '@/../public/PZPN_Polska.jpg'
import pzpn24 from '@/../public/pzpn24.jpg'
import ksmzpn from '@/../public/ksmzpn.png'
import rozpn from '@/../public/rozpn.png'

import styles from './UsefulLinks.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FaExternalLinkAlt } from 'react-icons/fa'

const UsefulLinks = () => {
	const usefulLinks = [
		{
			name: 'Polski Związek Piłki Nożnej',
			path: 'https://www.pzpn.pl/',
			image: pzpn.src,
		},
		{
			name: 'Extranet PZPN24',
			path: 'https://pzpn24.pzpn.pl/',
			image: pzpn24.src,
		},
		{
			name: 'Kolegium Sędziów Mazowieckiego ZPN',
			path: 'http://www.ksmzpn.pl/',
			image: ksmzpn.src,
		},
		{
			name: 'Mazowiecki ZPN - Delegatura Radom',
			path: 'http://www.rozpn.pl/',
			image: rozpn.src,
		},
	]

	return (
		<div className={styles['useful-links']}>
			{usefulLinks.map(link => (
				<Link
					className={styles['useful-links__link']}
					href={link.path}
					target='_blank'
					rel='noreferrer'
					key={link.name}>
					<div className={styles['useful-links__image']}>
						<Image
							src={link.image}
							alt={link.name}
							fill
						/>
					</div>

					<span className={styles['useful-links__text']}>
						{link.name} <FaExternalLinkAlt color='white' />
					</span>
				</Link>
			))}
		</div>
	)
}

export default UsefulLinks
