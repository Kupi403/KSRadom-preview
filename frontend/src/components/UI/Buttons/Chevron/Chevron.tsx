import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import styles from './Chevron.module.scss'

const Chevron = ({ orientation = 'right' }: { orientation: 'up' | 'down' | 'left' | 'right' }) => {
	return <FaChevronRight className={`${styles.button} ${styles[orientation]}`} />
}

export default Chevron
