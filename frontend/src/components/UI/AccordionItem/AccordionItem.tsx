import styles from './AccordionItem.module.scss'
import Chevron from '@/components/UI/Buttons/Chevron/Chevron'
type AccordionItemProps = {
	title: string
	text: string
	isOpen: boolean
	onClick: () => void
	isLoading?: boolean
}
const AccordionItem = ({ title, text, isOpen, onClick, isLoading }: AccordionItemProps) => (
	<div className={`${styles.accordionItem} ${isLoading ? styles.loading : ''}`}>
		{!isLoading && (
			<>
				<button
					className={styles.question}
					onClick={onClick}
					aria-expanded={isOpen}>
					<strong>{title}</strong>
					<Chevron orientation={isOpen ? 'down' : 'up'} />
				</button>
				<div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
					<div className={styles.inner}>
						<div className={styles.answer}>{text}</div>
					</div>
				</div>
			</>
		)}
	</div>
)

export default AccordionItem
