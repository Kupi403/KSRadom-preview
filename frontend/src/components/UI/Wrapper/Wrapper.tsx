import React from 'react'
import styles from '@/styles/layout.module.scss'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.wrapper}>{children}</div>
}

export default Wrapper
