import SubPageHeader from '@/components/Headers/SubPageHeader'
import SlideUp from '../Buttons/SlideUp/SlideUp'
import Wrapper from '../Wrapper/Wrapper'

export const SubpageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<SubPageHeader />
			<Wrapper>
				{children}
				<SlideUp />
			</Wrapper>
		</>
	)
}

export default SubpageLayout
