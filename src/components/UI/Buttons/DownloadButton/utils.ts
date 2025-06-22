export const formatFileSize = (sizeInKB: number): string => {
	const sizeInBytes = sizeInKB * 1024

	if (sizeInBytes >= 1_000_000_000) {
		return `${(sizeInBytes / 1_000_000_000).toFixed(2)} GB`
	} else if (sizeInBytes >= 1_000_000) {
		return `${(sizeInBytes / 1_000_000).toFixed(2)} MB`
	} else if (sizeInBytes >= 1_000) {
		return `${(sizeInBytes / 1_000).toFixed(2)} KB`
	} else {
		return `${sizeInBytes} B`
	}
}

export const getFileIcon = (ext: string): string => {
	if (!ext) return ''
	const cleanedExt = ext.replace('.', '').toLowerCase()

	const knownExtensions = ['pdf', 'docx', 'doc', 'txt', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'mp3', 'mp4']

	if (knownExtensions.includes(cleanedExt)) {
		return `/icons/files/${cleanedExt}.svg`
	}
	return '/icons/files/pdf.svg'
}
