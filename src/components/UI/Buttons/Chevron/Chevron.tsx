import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import styles from './Chevron.module.scss'
import { ChevronProps } from './types'

const Chevron = ({ orientation = 'right' }: ChevronProps) => {
	return <FaChevronRight className={`${styles.button} ${styles[orientation]}`} />
}

export default Chevron
