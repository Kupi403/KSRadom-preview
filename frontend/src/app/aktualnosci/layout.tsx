'use client'

import SubPageHeader from '@/components/Headers/SubPageHeader'
import { use } from 'react'
import styles from '@/styles/layout.module.scss'

export function AktualnosciLayout({
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

			<div className={styles.wrapper}>
				<main className={styles.main}>{children}</main>
			</div>
		</>
	)
}

export default AktualnosciLayout
