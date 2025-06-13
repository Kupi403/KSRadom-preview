'use client'

import { NewsType } from '@/types/PostType'
import React from 'react'
import Image from 'next/image'
import useSetDate from '@/helpers/useSetDate'
// import './NewsDetails.scss'
import NewsDateAndCreatorInfo from '@/components/UI/NewsCard/NewsDateAndCreator/NewsCreationInfo'
import { FaUser } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'

import Link from 'next/link'
import useFetchAdjacentPosts from '@/hooks/useFetchAdjacentPosts'
import NewsFiles from './Files/NewsFiles'
import NewsMedia from './Media/NewsMedia'
import AdjacentPosts from './AdjacentPosts/AdjacentPosts'
import Description from './Description/Description'
import Categories from './Categories/Categories'
import { URL } from '@/constant/url'

import styles from './NewsDetails.module.scss'

const NewsDetails = ({ post }: { post: NewsType}) => {
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
