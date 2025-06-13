import { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import './ThemeButton.scss'

const ThemeButton: React.FC = () => {
	const [isToggled, setIsToggled] = useState(false)

	const handleToggle = () => {
		setIsToggled(prev => !prev)
	}

	useEffect(() => {
		if (isToggled) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [isToggled])

	return (
		<div className='toggle-container'>
			<button
				className={`toggle-button ${isToggled ? 'dark' : 'light'}`}
				onClick={handleToggle}
				aria-label='Toggle theme'>
				<span className='icon sun'>
					<FaSun />
				</span>
				<span className='icon moon'>
					<FaMoon />
				</span>
				<span className={`toggle-circle ${isToggled ? 'right' : 'left'}`} />
			</button>
		</div>
	)
}

export default ThemeButton
