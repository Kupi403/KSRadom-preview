import { NavItemSubcategory } from '@/components/Navbar/types'
import lectureImage from '@/../public/header/szkolenie.jpg'
import refereesImage from '@/../public/header/sedziowie.jpg'
import peopleImage from '@/../public/header/tlum.jpg'
import cardsImage from '@/../public/header/kartki.jpg'
import runImage from '@/../public/header/fotokomorka.jpg'
import downloadsImage from '@/../public/header/do-pobrania.jpg'
import noteImage from '@/../public/header/notes.jpg'
import documentsImage from '@/../public/header/dokumenty.jpg'
import examImage from '@/../public/header/test.jpg'

export const LEFT_PANEL_LINKS: NavItemSubcategory[] = [
	{
		text: 'Aktualności',
		address: '/aktualnosci?page=1&sort=desc',
		order: 1,
	},
	{
		text: 'Organizacja',
		address: '/organizacja',
		order: 2,
		image: peopleImage.src,
		subcategories: [
			{ text: 'Zarząd', address: '/zarzad' },
			{ text: 'Sędziowie', address: '/sedziowie', image: refereesImage.src },
		],
	},
	{ text: 'Obsada', address: '/aktualnosci?page=1&sort=desc&category=obsada', showSeason: true, order: 3 },
	{
		text: 'Szkolenie',
		address: '/szkolenie',
		order: 4,
		image: lectureImage.src,
		subcategories: [
			{ text: 'Materiały szkoleniowe', address: '/materialy-szkoleniowe', image: examImage.src, showSeason: true },
			{ text: 'Klipy UEFA', address: 'https://uefaclips.eu', isExternal: true },
			{ text: 'FAQ dla kandydatów', address: '/faq' },
		],
	},
]

export const RIGHT_PANEL_LINKS: NavItemSubcategory[] = [
	{ text: 'Kalendarz', address: '/kalendarz', image: cardsImage.src, order: 5 },
	{
		text: 'Do pobrania',
		address: '/do-pobrania',
		order: 6,
		image: downloadsImage.src,
		subcategories: [
			{ text: 'Dokumenty', address: '/dokumenty', image: documentsImage.src, showSeason: true },
			{ text: 'Treningi', address: '/treningi', image: noteImage.src, showSeason: true },
			{ text: 'Egzaminy kondycyjne', address: '/egzaminy-kondycyjne', image: runImage.src },
		],
	},
	{ text: 'Zostań sędzią', address: '/zostan-sedzia', order: 7 },
	{ text: 'Kontakt', address: '/kontakt', order: 8 },
]

export const ALL_LINKS: NavItemSubcategory[] = [...LEFT_PANEL_LINKS, ...RIGHT_PANEL_LINKS]
