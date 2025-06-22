import { SeasonsType } from '@/hooks/ReactQuery/useFetchSeasons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export const handleSeasonOptions = (seasons: SeasonsType[] | undefined | null) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const path = usePathname()

	const seasonFromURL = searchParams.get('season') || ''

	const seasonsOptions = useMemo(
		() =>
			seasons?.map((season, id) => ({
				value: season.name,
				caption: season.name.charAt(0).toUpperCase() + season.name.slice(1),
				default: id === 1,
			})) ?? [],
		[seasons]
	)

	const defaultValue = seasonsOptions.find(season => season.default)?.value || ''

	const [selectedSeason, setSelectedSeason] = useState<string>(seasonFromURL || defaultValue)

	const handleSeasonClick = (season: string) => {
		if (season !== selectedSeason) setSelectedSeason(season)
	}

	useEffect(() => {
		if (seasonFromURL) {
			setSelectedSeason(seasonFromURL)
		} else if (defaultValue && !seasonFromURL) {
			setSelectedSeason(defaultValue)
		}
	}, [seasonFromURL, defaultValue])

	useEffect(() => {
		if (selectedSeason) {
			router.push(`${path}?season=${selectedSeason}`, { scroll: false })
		}
	}, [selectedSeason, router, path])

	return { handleSeasonClick, selectedSeason, seasonsOptions }
}

export default handleSeasonOptions
