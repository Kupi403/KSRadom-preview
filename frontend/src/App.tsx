import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Nav'
import MainHeader from './components/MainHeader/MainHeader'
import BackgroundSlider from 'react-background-slider'

function App() {
	type Post = {
		title: string
		// text: { type: string; children: { text: string }[] }[]
		text: string
		documentId: string
	}
	const URL = import.meta.env.VITE_BACKEND
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		fetch(`${URL}api/posts`)
			.then(res => res.json())
			.then(data => {
				const posts = data.data
				setPosts(posts)
			})
	}, [])

	return (
		<>
			<Navbar />
			<MainHeader />
			<main className='main'>
				<section className='posts'>
					<h1 className='section-title'>Aktualności</h1>
					{posts.map(post => {
						console.log(post)
						return (
							<div
								className='posts__post'
								key={post.documentId}>
								<div className='posts__post--image'>
									<img
										src='https://picsum.photos/300/200'
										alt=''
									/>
								</div>
								<div className='posts__post--text'>
									<h2 className='post__title'>{post.title}</h2>
									<p className='post__text'>{post.text}</p>
								</div>
							</div>
						)
					})}
				</section>
				<section className='other'>
					<div className='other__calendar'>
						<h2 className='section-title'>Calendar</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nisi ab consequuntur sint molestiae minus,
							molestias dolor inventore maiores vel recusandae, nesciunt doloremque. Quia odit ex odio ad velit natus.
						</p>
					</div>
				</section>
			</main>
		</>
	)
}
export default App
