import './NewsLoadingBox.scss'

const NewsLoadingBox = ({ subpage }: { subpage?: boolean }) => {
	return (
		<div className={`news-loading-box ${subpage ? 'subpage' : 'main'}`}>
			<div className='news-loading-box__image'></div>
			<div className='news-loading-box__content'>
				<div>
					<div className='news-loading-box__title'></div>
					<div className='news-loading-box__creator'></div>
				</div>
				<div className='news-loading-box__text'></div>
				<div className='news-loading-box__more'></div>
			</div>
		</div>
	)
}

export default NewsLoadingBox
