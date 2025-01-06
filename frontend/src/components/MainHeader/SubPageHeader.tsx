'use client'
import React, { useEffect, useState } from 'react'
import './SubPageHeader.scss'
import { useSelector } from 'react-redux'
import obsadaHero from '../../assets/obsada-category.jpg'
import Link from 'next/link'

interface SubPageHeaderProps {
	documentId: string
	title?: string
}
const SubPageHeader: React.FC<SubPageHeaderProps> = ({ documentId, title }) => {
	console.log(documentId)
	// const heroImageURL = './obsada-category.jpg'
	const [category, setCategory] = useState<{ category: string; path: string; title: string } | null | void>()
	const heroImageURL = `/assets/${category}-hero.jpg`
	async function fetchCategory(documentId: string): Promise<{ category: string; path: string; title: string } | null> {
		try {
			const response = await fetch(
				`http://localhost:1337/api/posts/${documentId.slice(
					-24
				)}?populate[categories][fields][0]=name&populate[categories][fields][1]=path&fields[0]=title&pagination[pageSize]=10&pagination[page]=1`
			)
			if (!response.ok) return null
			const data = await response.json()
			console.log(data.data.categories)
			return {
				category: data?.data?.categories?.[0]?.name,
				path: data?.data?.categories?.[0]?.path,
				title: data?.data?.title,
			}
		} catch (error) {
			console.error('Error fetching category:', error)
			return null
		}
	}
	useEffect(() => {
		async function fetchNewsCategory(id: string) {
			const category = await fetchCategory(id)
			setCategory(category)
			console.log(category)
		}
		fetchNewsCategory(documentId)
	}, [documentId])

	return (
		<header className='subpage-header'>
			<div
				key={1}
				className='subpage-header__hero'
				style={{
					backgroundImage: `url(${obsadaHero.src})`,
				}}></div>
			<div className='subpage-header__hero--shadow'></div>

			{category && (
				<h3 className='subpage-header__title'>
					<span>
						<Link href={'/'}>Strona główna </Link>
					</span>
					<span>
						<Link href={category?.path}>{`${category?.category.toUpperCase()} `}</Link>
					</span>
					<span>
						/<Link href={''}>{` ${category?.title}`}</Link>
					</span>
				</h3>
			)}

			{title && (
				<h3 className='subpage-header__title'>
					<span>{title}</span>
				</h3>
			)}

			<nav
				className='subpage-header__breadcrumbs'
				aria-label='breadcrumb'>
				<ul></ul>
			</nav>
		</header>
	)
}

export default SubPageHeader
