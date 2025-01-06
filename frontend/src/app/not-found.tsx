import SubPageHeader from '@/components/MainHeader/SubPageHeader'
import React from 'react'

const NotFound = () => {
	return (
		<>
			<SubPageHeader title='Nie znaleziono strony'/>
			<main className='not-found'>
				<h1>Not found</h1>
				<p>There is no page here</p>
			</main>
		</>
	)
}

export default NotFound
