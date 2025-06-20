'use client'

import { useEffect, useMemo, useState } from 'react'
import RefereeGroup from './RefereeGroup'
import styles from './Referees.module.scss'
import SearchInput from '../UI/Search/SearchInput'
import useDebouncedValue from '../UI/Search/utils'
import { RefereesListPropsType } from './types'

const RefereesList = ({ data }: RefereesListPropsType) => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedTerm = useDebouncedValue(searchTerm)
	const [activeLeague, setActiveLeague] = useState<string | null>(null)

	const handleScrollIntoLeague = (league: string) => {
		const el = document.querySelector(`[data-league="${league}"]`)
		if (el) {
			el.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}
	useEffect(() => {
		const handleScroll = () => {
			const leagueElements = Array.from(document.querySelectorAll('[data-league]'))

			let active: string | null = null

			for (let i = leagueElements.length - 1; i >= 0; i--) {
				const el = leagueElements[i] as HTMLElement
				const rect = el.getBoundingClientRect()
				if (rect.top <= 100) {
					active = el.getAttribute('data-league')
					break
				}
			}

			setActiveLeague(active)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const filteredData = useMemo(
		() =>
			data
				.map(group => {
					const filteredRefs = group.referees.filter(
						referee =>
							`${referee.surname} ${referee.name}`.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
							`${referee.name} ${referee.surname}`.toLowerCase().startsWith(searchTerm.toLowerCase())
					)

					return {
						...group,
						referees: filteredRefs,
					}
				})
				.filter(group => group.referees.length > 0),
		[data, debouncedTerm]
	)

	return (
		<main className={styles.list}>
			<h1>Lista sędzi oraz sędziów Komisji Sędziowskiej Radom na sezon 2024/2025</h1>
			<div className={`${styles.input} ${styles.mobile}`}>
				<SearchInput
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder='Wyszukaj sędziego'
				/>
			</div>
			<div className={styles.content}>
				<div className={`${styles.input} ${styles.desktop}`}>
					<SearchInput
						value={searchTerm}
						onChange={setSearchTerm}
						placeholder='Wyszukaj sędziego'
					/>
					{filteredData.length > 0 &&
						filteredData.map(group => (
							<p
								key={group.league}
								className={`${styles.league} ${group.league === activeLeague ? styles.active : ''}`}
								onClick={() => handleScrollIntoLeague(group.league)}>
								{group.league} ({group.referees.length})
							</p>
						))}
				</div>
				<div className={styles.groups}>
					{filteredData.length > 0 ? (
						filteredData.map(refereeGroup => (
							<RefereeGroup
								key={refereeGroup.league}
								leagueName={refereeGroup.league}
								referees={refereeGroup.referees}
							/>
						))
					) : (
						<p>Brak wyników</p>
					)}
				</div>
			</div>
		</main>
	)
}

export default RefereesList
