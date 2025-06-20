import SubPageHeader from '@/components/Headers/SubPageHeader'
import styles from '@/styles/layout.module.scss'
import Wrapper from '@/components/UI/Wrapper/Wrapper'

export function AktualnosciLayout({ children, params }: { children: React.ReactNode; params: { documentId: string } }) {
	const { documentId } = params

	return (
		<>
			<SubPageHeader documentId={documentId} />

			<Wrapper>
				<main className={styles.main}>{children}</main>
			</Wrapper>
		</>
	)
}

export default AktualnosciLayout
