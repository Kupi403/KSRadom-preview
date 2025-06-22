import { FileType } from '@/components/News/types'
import { SeasonsType } from '@/hooks/ReactQuery/useFetchSeasons'

export type DownloadButtonProps = {
	file: FileType
	children: React.ReactNode
	href: string
	season?: SeasonsType
	isExternal?: boolean
} & React.ComponentPropsWithoutRef<'button'> &
	React.ComponentPropsWithoutRef<'a'>
