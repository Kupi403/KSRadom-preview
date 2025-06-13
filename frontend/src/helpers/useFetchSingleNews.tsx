'use client'
import { API_URL } from '@/constant/url'
import { useState, useEffect } from 'react'

export function useFetch(endpoint: string, type: 'posts' | 'post', id?: number) {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [data, setData] = useState([])

	// const URL = import.meta.env.VITE_BACKEND
	// const URL = 'http://93.127.214.207/api'
	// const URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'
	// // const URL = 'http://93.127.214.207/api'
	// const API_URL = `${URL}/api`
	const queryString = '?populate=*&sort[0]=publishedAt:desc&pagination[pageSize]=10&pagination[page]=1'
	const queryPostString = '?populate=*'

	const queryStrings = {
		posts: '?populate=*&sort[0]=publishedAt:desc&pagination[pageSize]=10&pagination[page]=1',
		post: `/${id}?populate=*`,
	}

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			setError(null)
			try {
				// console.log(`${URL}api/${endpoint}?populate=*`)
				const res = await fetch(`${API_URL}/${endpoint}${queryStrings[type]}`)
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
