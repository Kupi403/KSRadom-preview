'use client'
import React, { useState } from 'react'
import styles from './Footer.module.scss'
import Wrapper from '../UI/Wrapper/Wrapper'
import Image from 'next/image'
import Link from 'next/link'
import { MdPlace, MdMail, MdAccountBalance, MdContentCopy } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'

import { ALL_LINKS } from '../Navbar/const'
import { STAFF_MEMBERS, BASIC_INFO } from '@/constant/contact'
import { SOCIAL_MEDIA } from '@/constant/socialMedia'
import logo from '@/assets/images/logo.png'

const Footer = () => {
	const [copied, setCopied] = useState(false)
	const handleCopyBankAccNumber = () => {
		if (copied) return
		navigator.clipboard.writeText(BASIC_INFO.ACC_NUMBER.TEXT)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}
	return (
		<div
			className={styles.footer}
			id='contact'>
			<Wrapper>
				<div className={styles.content}>
					<div className={styles.contact}>
						<Image
							src={logo.src}
							width={logo.width / 5}
							height={logo.height / 5}
							alt='Logo KS Radom'
						/>
						<div className={styles.items}>
							<div className={styles.item}>
								<MdPlace size={40} />
								<p>{BASIC_INFO.PLACE.TEXT}</p>
							</div>
							<div className={styles.item}>
								<MdMail size={20} />
								<Link href={`mailto:${BASIC_INFO.MAIL.TEXT}`}>{BASIC_INFO.MAIL.TEXT}</Link>
							</div>
							<div
								className={`${styles.item} ${copied ? styles.disabled : ''}`}
								onClick={handleCopyBankAccNumber}
								style={{ cursor: copied ? 'not-allowed' : 'pointer' }}>
								<MdAccountBalance size={30} />
								<p className={styles['acc-number']}>
									Nr konta bankowego: <span>{BASIC_INFO.ACC_NUMBER.TEXT}</span>
									<MdContentCopy />
								</p>
								<span className={`${styles.hint} ${copied ? styles.show : ''}`}>Skopiowano</span>
							</div>
						</div>
					</div>
					<div className={`${styles.group} ${styles.staff}`}>
						<h3 className={styles.subtitle}>Kontakt</h3>
						<div className={styles.items}>
							{STAFF_MEMBERS.map((member, index) => (
								<div
									className={styles.item}
									key={index}>
									<p className={styles.role}>{member.role}</p>
									<p>{`${member.name} ${member.surname}`}</p>

									<div className={styles.phone}>
										<FiPhone />
										<Link href={`tel:+48${member.phone}`}>{member.phone}</Link>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={`${styles.group} ${styles.links}`}>
						<h3 className={styles.subtitle}>Na skróty</h3>
						<ul>
							{ALL_LINKS.map((link, index) => (
								<li
									key={index}
									className={styles.item}>
									<Link
										className={styles.link}
										href={link.address}>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className={`${styles.group} ${styles.social}`}>
						<h3 className={styles.subtitle}>Social media</h3>
						<div className={styles.items}>
							{SOCIAL_MEDIA.map((item, idx) => (
								<Link
									key={idx}
									className={styles.item}
									href={item.link}
									target='_blank'>
									<Image
										src={item.icon}
										width={30}
										height={30}
										alt={item.name}
									/>

									<span className={styles.name}>{item.name}</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</Wrapper>

			<div className={styles.author}>
				<div className={styles.data}>
					<p>Komisja Sędziowska Radom | {new Date().getFullYear()}</p>
					<p>
						Wykonanie:{' '}
						<Link
							href={'https://www.linkedin.com/in/michal-kupidura-85ab1326a'}
							target='_blank'>
							Michał Kupidura
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
