import SubPageHeader from '@/components/Headers/SubPageHeader'
import styles from '@/styles/layout.module.scss'
import Wrapper from '@/components/UI/Wrapper/Wrapper'

export default async function ({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ documentId: string }>
}) {
	const { documentId } = await params

	return (
		<>
			<SubPageHeader documentId={documentId} />
			<Wrapper>
				<main className={styles.main}>{children}</main>
			</Wrapper>
		</>
	)
}
