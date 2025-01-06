import { Post } from '@/types/PostType'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useSetDate from '@/helpers/useSetDate'
import './NewsPage.scss'
import NewsDateAndCreatorInfo from '@/components/UI/NewsDateAndCreatorInfo'
import { FaUser } from 'react-icons/fa'
import { MdDateRange } from 'react-icons/md'
import { FaDownload } from 'react-icons/fa'
import { GrDocumentPdf } from 'react-icons/gr'

import Link from 'next/link'

const NewsPage: React.FC<Post> = ({ post }) => {
	async function fetchPreviousAndNextPosts(currentDocumentId: string) {
		const url = `http://localhost:1337/api/posts/adjacent/${currentDocumentId}`
		const response = await fetch(url)
		const { previousPost, nextPost } = await response.json()
		return { previousPost, nextPost }
	}

	const res = fetchPreviousAndNextPosts(post.documentId)
		.then(({ previousPost, nextPost }) => {
			return (
				<div className='post__navigation'>
					{previousPost && (
						<Link href={`/aktualnosci/${previousPost.documentId}`}>
							<p className='post__navigation--previous'>{previousPost.title}</p>
						</Link>
					)}
					{nextPost && (
						<Link href={`/aktualnosci/${nextPost.documentId}`}>
							<p className='post__navigation--next'>{nextPost.title}</p>
						</Link>
					)}
				</div>
			)
		})
		.catch(error => {
			return <p>{error.message}</p>
		})

	const date = useSetDate(post.createdAt)
	const creator = `${post.createdBy.firstname} ${post.createdBy.lastname}`
	// console.log(post)
	const descriptionSpitted = post.description.split('\n')
	return (
		<article className='post'>
			<h1 className='post__title'>{post.title}</h1>
			<div className='post__info'>
				<p className='post__info-box post__info--date'>
					<MdDateRange color='#797979' />
					{date}
				</p>
				<p className='post__info-box post__info--author'>
					<FaUser color='#797979' />
					{creator}
				</p>
			</div>

			<div className='post__image'>
				{post.thumbnail ? (
					<Image
						src={`http://localhost:1337${post.thumbnail.url}`}
						alt={post.title}
						fill
					/>
				) : (
					<Image
						src={`https://picsum.photos/800`}
						alt={'post.title'}
						fill
					/>
				)}
			</div>
			<div className='post__tags'>
				<p>Kategorie:</p>
				{post.categories.map((tag: { name: string }) => {
					return <p>{tag.name}</p>
				})}
			</div>

			<div className='post__description'>
				{/* {descriptionSpitted.map((item: string) => (
					<p>{item}</p>
				))} */}
				<p>{post.description}</p>
			</div>

			{post.files && (
				<div className='post__download'>
					<p>Pliki do pobrania:</p>
					<div className='post__download__items'>
						{post.files.map((file: { url: string }) => {
							return (
								<Link
									className='post__download__item'
									href={`http://localhost:1337${file.url}`}
									target='_blank'>
									<p>
										<GrDocumentPdf />
										{post.title}
									</p>
									<FaDownload />
								</Link>
							)
						})}
					</div>
				</div>
			)}

			{post.media &&
				post.media.map(item => {
					return (
						<div className='post__media'>
							<Image
								src={`http://localhost:1337${item.url}`}
								alt={post.title}
								width={300}
								height={400}
							/>
						</div>
					)
				})}

			<p>Sprawdź ostatnie posty</p>
			{res}
		</article>
	)
}

export default NewsPage
