'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './SubPageHeader.module.scss'
import obsadaHero from '@/assets/images/obsada-category.jpg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useFetchCategories from '@/hooks/useFetchCategories'
import { useFindHeaderTitle } from '@/helpers/findHeaderTitle'
import { SubPageHeaderProps } from './types'

const SubPageHeader = ({ errorTitle }: SubPageHeaderProps) => {
	const params = usePathname().split('/').filter(Boolean)

	const lastParam = params[params.length - 1]
	const documentId = lastParam.split('-').pop()?.length === 24 ? lastParam.split('-').pop() : null

	const { data: categories } = useFetchCategories(documentId ?? null)
	const heroRef = useRef<HTMLDivElement>(null)

	const generateBreadcrumbs = () => {
		const headerElements = [...params].map(segment => useFindHeaderTitle(segment))

		const lastElement = headerElements.pop()

		const title = documentId ? lastParam.split('-').slice(0, -1).join(' ') : lastElement?.text

		const links = headerElements.map((segment, i) => {
			const href = segment?.address
			return (
				<div
					key={i}
					className={styles.breadcrumbs}>
					{i === 0 && (
						<span>
							<Link href='/'>Strona główna</Link>
						</span>
					)}
					<span>{'>'}</span>
					<span key={i}>
						<Link href={href || '#'}>{segment?.text}</Link>{' '}
					</span>
				</div>
			)
		})

		if (errorTitle)
			return (
				<div className={styles.breadcrumbs}>
					<strong>Nie znaleziono strony</strong>
				</div>
			)

		if (params.length <= 1)
			return (
				<>
					<div className={styles.breadcrumbs}>
						<span>
							<Link href='/'>Strona główna</Link>
						</span>
					</div>
					<strong>{categories ? categories.title : title}</strong>
				</>
			)

		return (
			<>
				{links}
				<strong>{categories ? categories.title : title}</strong>
			</>
		)
	}

	const img = documentId ? categories?.image : useFindHeaderTitle(lastParam)?.image

	useEffect(() => {
		const handleScroll = () => {
			if (heroRef.current) {
				const scrollPosition = window.pageYOffset

				heroRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<header className={styles['subpage-header']}>
			<div
				ref={heroRef}
				className={styles.hero}
				style={{
					backgroundImage: `url(${img || obsadaHero.src})`,
				}}></div>
			<div className={styles.shadow}></div>

			<nav className={styles.content}>{generateBreadcrumbs()}</nav>
		</header>
	)
}

export default SubPageHeader
