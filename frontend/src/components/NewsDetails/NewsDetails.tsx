'use client'

import React from 'react'
import Image from 'next/image'
import NewsDateAndCreatorInfo from '@/components/UI/NewsCard/NewsDateAndCreator/NewsCreationInfo'
import useFetchAdjacentPosts from '@/hooks/ReactQuery/useFetchAdjacentPosts'
import NewsFiles from './Files/NewsFiles'
import NewsMedia from './Media/NewsMedia'
import AdjacentPosts from './AdjacentPosts/AdjacentPosts'
import Description from './Description/Description'
import Categories from './NewsCategories/NewsCategories'
import { URL } from '@/constant/url'
import styles from './NewsDetails.module.scss'
import { NewsType } from '../News/types'

const NewsDetails = ({ post }: { post: NewsType }) => {
	const { data: adjacentPosts, isLoading, isError } = useFetchAdjacentPosts(post.documentId)

	return (
		<article className={styles.post}>
			<h1 className={styles.title}>{post.title}</h1>

			<NewsDateAndCreatorInfo
				publishedAt={post.createdAt}
				createdBy={post.createdBy}
				newsDetails
			/>
			<div className={styles.image}>
				<Image
					src={post.thumbnail?.url ? `${URL}${post.thumbnail.url}` : 'https://picsum.photos/800'}
					alt={post.title}
					fill
				/>
			</div>
			<Categories categories={post.categories} />

			<Description content={post.newDescription ?? post.description} />

			{post.files && <NewsFiles files={post.files} />}

			{post.media && <NewsMedia media={post.media} />}

			{adjacentPosts && !isError && !isLoading && <AdjacentPosts adjacentPosts={adjacentPosts} />}
		</article>
	)
}

export default NewsDetails
