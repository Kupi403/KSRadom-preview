import { useState, useEffect } from 'react'

export function useFetch(endpoint: string) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [data, setData] = useState([])

	const URL = import.meta.env.VITE_BACKEND

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)
			try {
				// console.log(`${URL}api/${endpoint}?populate=*`)
				const res = await fetch(`${URL}api/${endpoint}?populate=*`)
				if (!res.ok) {
					throw new Error(`${res.status} ${res.statusText}`)
				}
				const responseData = await res.json()
				setData(responseData.data)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return { loading, error, data }
}
