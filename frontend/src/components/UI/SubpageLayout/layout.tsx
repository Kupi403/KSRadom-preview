import SubPageHeader from '@/components/Headers/SubPageHeader'
import styles from '@/styles/layout.module.scss'
import SlideUp from '../Buttons/SlideUp/SlideUp'

export const SubpageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<SubPageHeader />
			<div className={styles.wrapper}>
				{children}
				<SlideUp />
			</div>
		</>
	)
}

export default SubpageLayout
