import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Nav'
import MainHeader from './components/MainHeader/MainHeader'
import NewsCard from './components/UI/NewsCard/NewsCard'
// import { News } from './types/newsType'
import SectionContainer from './components/UI/SectionContainer'

// import Wrapper from './components/UI/Wrapper/Wrapper'

function App() {
	const URL = import.meta.env.VITE_BACKEND
	const [news, setNews] = useState<any[]>([])

	useEffect(() => {
		fetch(`${URL}api/posts?populate=*`)
			// fetch('https://bus20-api-lnp2.laczynaspilka.pl/api/lnp/v1')
			.then(res =>
				// console.log(res)
				res.json()
			)
			.then(data => {
				// console.log(data)
				const news = data.data
				setNews(news)
			})
	}, [])

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
							{news.map(news => {
								return (
									<NewsCard
										key={news.documentId}
										news={news}
									/>
								)
							})}
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
