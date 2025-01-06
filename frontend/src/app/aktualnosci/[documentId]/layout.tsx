'use client'

import SubPageHeader from '@/components/MainHeader/SubPageHeader'
import { use } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategory } from '@/redux/slices/categorySlice'
import styles from './../../../styles/layout.module.scss'

export default function AktualnosciLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ documentId: string }>
}) {
	const { documentId } = use(params)

	return (
		<>
			<SubPageHeader documentId={documentId} />
			<div className={styles.wrapper}>{children}</div>
		</>
	)
}
