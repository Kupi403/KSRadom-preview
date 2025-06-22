import { API_URL } from '@/constant/url'

export default async function createFetchFunction<T>(url: string, extractor: (data: any) => T): Promise<T> {
	try {
		const response = await fetch(`${API_URL}${url}`)
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()
		return extractor(data)
	} catch (error) {
		throw new Error(`Nie udało się pobrać danych z API. ${error}`)
	}
}
