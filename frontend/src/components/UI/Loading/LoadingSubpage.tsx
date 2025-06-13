import Image from 'next/image'
import styles from './LoadingSubpage.module.scss'
import logo from '@/../public/logo-white-big.svg'

const LoadingSubpage = () => {
	return (
		<div className={styles.container}>
			<Image
				className={styles.image}
				src={logo.src}
				alt='Logo KS Radom'
				fill
			/>
           
		</div>
	)
}

export default LoadingSubpage
