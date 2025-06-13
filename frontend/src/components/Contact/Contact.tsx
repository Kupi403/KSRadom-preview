'use client'
import { GOOGLE_MAPS_URL } from '@/constant/contact'
import styles from './Contact.module.scss'
import ContactForm from '../ContactForm/ContactForm'
const Contact = () => {
	return (
		<div className={styles.content}>
			<div className={styles.map}>
				<iframe
					src={GOOGLE_MAPS_URL}
					width='100%'
					height='100%'
					style={{ border: 0 }}
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'></iframe>
			</div>

			<div className={styles.form}>
				<h2 className={styles.subtitle}>Skontaktuj się z nami!</h2>
				<ContactForm />
			</div>
		</div>
	)
}

export default Contact
