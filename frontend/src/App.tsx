import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Nav'
import MainHeader from './components/MainHeader/MainHeader'
import NewsCard from './components/UI/NewsCard/NewsCard'
import { News } from './types/newsType'
import SectionContainer from './components/UI/SectionContainer'
import { useFetch } from './helpers/useFetch'

// import Wrapper from './components/UI/Wrapper/Wrapper'

function App() {
	type fetchedNews = {
		loading: boolean
		error: string
		data: News[]
	}
	const { loading: boolean, error: string, data = [] as News[] } = useFetch('posts')

	// console.log(data)
	return (
		<>
			{/* <Wrapper> */}
			<Navbar />
			{/* </Wrapper> */}
			<MainHeader />
			<div className='wrapper'>
				<main className='main'>
					<SectionContainer
						title='Aktualności'
						priority='main'>
						<div className='news'>
							{data.length > 0 ? (
								data
									// .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
									.map(news => {
										return (
											<NewsCard
												key={news.documentId}
												news={news}
											/>
										)
									})
							) : (
								<p>Brak aktualności</p>
							)}
						</div>
					</SectionContainer>

					<SectionContainer
						title='Kalendarz'
						priority='aside'>
						<div className='other__calendar'>
							<h2 className='section-title'>Calendar</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nisi ab consequuntur sint molestiae
								minus, molestias dolor inventore maiores vel recusandae, nesciunt doloremque. Quia odit ex odio ad velit
								natus.
							</p>
						</div>
					</SectionContainer>
				</main>
			</div>
		</>
	)
}
export default App
