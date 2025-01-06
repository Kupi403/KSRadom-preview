const useSetDate = (date: string) => {
	const newDate = new Date(date)
	const formattedDate = `${newDate.toLocaleDateString('pl', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})}, ${newDate.toLocaleTimeString('pl', {
		hour: '2-digit',
		minute: '2-digit',
	})}`

	return formattedDate
}

export default useSetDate
