'use client'

import styles from './DownloadItems.module.scss'
import { URL } from '@/constant/url'
import DownloadButton from '@/components/UI/Buttons/DownloadButton/DownloadButton'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'
import useFetchDownloadItems from '@/hooks/ReactQuery/useFetchDownloadItems'
import Options from '@/components/UI/Buttons/Options/Options'
import { useEffect, useState } from 'react'
import useFetchSeasons from '@/hooks/ReactQuery/useFetchSeasons'
import ErrorComponent from '@/components/UI/States/Error'
import handleSeasonOptions from './util'
import DataState from '@/components/UI/States/DataState'
import { DownloadItem, DownloadItemsProps } from './types'

const DownloadItems = ({ category, showSeason }: DownloadItemsProps) => {
	const { data: seasons, isLoading: isLoadingSeasons } = useFetchSeasons()

	const { handleSeasonClick, selectedSeason, seasonsOptions } = handleSeasonOptions(seasons)

	const { data: files, isLoading, isError, error, refetch } = useFetchDownloadItems(category, selectedSeason)

	const [groupedData, setGroupedData] = useState<Array<[string, DownloadItem[]]>>([])

	const groupFilesByCategory = async (files: DownloadItem[]): Promise<Map<string, DownloadItem[]>> => {
		const categories = new Map()
		files.forEach(file => {
			const category = file.download_categories[0].name
			if (categories.has(category)) categories.get(category).push(file)
			else categories.set(category, [file])
		})
		return categories
	}

	useEffect(() => {
		if (files && files.length > 0) {
			groupFilesByCategory(files).then(grouped => {
				setGroupedData(Array.from(grouped.entries()))
			})
		} else setGroupedData([])
	}, [files, selectedSeason])

	if (isError)
		return (
			<ErrorComponent
				description='Nie udało się pobrać zawartości.'
				error={error}
				refetchFn={refetch}
			/>
		)

	return (
		<div className={styles.downloads}>
			{showSeason && (
				<Options
					title='Sezon'
					options={seasonsOptions}
					value={selectedSeason}
					setValue={handleSeasonClick}
					loading={isLoadingSeasons}
				/>
			)}
			{isLoading && <LoadingSubpage />}

			{groupedData.length > 0 &&
				groupedData.map(([category, files]) => (
					<div
						key={category}
						className={styles.group}>
						<h3 className={styles.title}>{category}</h3>
						<div className={styles.files}>
							{files.map(file => {
								const itemURL = `${URL}${file.file.url}`
								return (
									<div key={file.id}>
										<DownloadButton
											href={itemURL}
											target='_blank'
											file={file.file}
											season={file.season}>
											{file.name}
										</DownloadButton>
									</div>
								)
							})}
						</div>
					</div>
				))}

			{!isLoading && !isError && !files?.length && (
				<DataState message={`Brak plików do pobrania z sezonu ${selectedSeason}`} />
			)}
		</div>
	)
}

export default DownloadItems
