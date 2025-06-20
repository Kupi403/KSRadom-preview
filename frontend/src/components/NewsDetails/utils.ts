import errorImage from '@/../public/empty.png'
import { FormatTypes } from '../News/types'
import { URL } from '@/constant/url'
export const getBestThumbnailURL = (formats: FormatTypes) => {
	if (formats.large) return `${URL}${formats.large.url}`
	if (formats.medium) return `${URL}${formats.medium.url}`
	if (formats.small) return `${URL}${formats.small.url}`
	if (formats.thumbnail) return `${URL}${formats.thumbnail.url}`
	return errorImage.src
}
