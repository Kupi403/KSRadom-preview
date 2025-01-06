import { PropsWithChildren } from 'react'
import './Wrapper.scss'

const Container: React.FC<PropsWithChildren> = ({ children }) => {
	return <div className='wrapper'>{children}</div>
}

export default Container
