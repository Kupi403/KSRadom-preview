'use client'
import { useQuery } from '@tanstack/react-query'
import { fetchAdjacentPosts } from '@/lib/fetch/fetchAdjacentPosts'

export default function useFetchAdjacentPosts(documentId: string) {
	return useQuery({
		queryKey: ['adjacentPosts', documentId],
		queryFn: () => fetchAdjacentPosts(documentId),
		enabled: !!documentId,
	})
}
