'use client'
import { useMemo, useState } from 'react'
import SearchInput from '../UI/Search/SearchInput'
import styles from './FAQ.module.scss'
import { FAQ_QUESTIONS } from './const'
import AccordionItem from '../UI/AccordionItem/AccordionItem'
import useDebouncedValue from '../UI/Search/utils'

const FAQ = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedTerm = useDebouncedValue(searchTerm)
	const [opened, setOpened] = useState<string | null>(null)

	const filteredQuestions = useMemo(() => {
		setOpened(null)
		return FAQ_QUESTIONS.filter(q => q.question.toLowerCase().includes(debouncedTerm.toLowerCase()))
	}, [debouncedTerm])

	const toggleQuestion = (question: string) => {
		setOpened(prev => (prev === question ? null : question))
	}

	return (
		<div className={styles.faq}>
			<h2 className={styles.title}>Najczęściej zadawane pytania</h2>
			<div className={styles.content}>
				<div className={styles.search}>
					<SearchInput
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder='Wyszukaj pytanie'
						isLoading={false}
					/>
				</div>
				<div className={styles.questions}>
					{filteredQuestions.length > 0 ? (
						filteredQuestions.map(element => (
							<AccordionItem
								key={element.question}
								title={element.question}
								text={element.answer}
								onClick={() => toggleQuestion(element.question)}
								isOpen={opened === element.question}
							/>
						))
					) : (
						<p>Brak wyników</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default FAQ
