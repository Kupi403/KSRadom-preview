import { Suspense } from 'react'
import sortedRefListData from '@/constant/dataRef'
import SectionContainer from '@/components/UI/SectionContainer/SectionContainer'
import RefereesList from '@/components/Referees/RefereesList'
import LoadingSubpage from '@/components/UI/Loading/LoadingSubpage'

const page = () => {
	return (
		<SectionContainer
			title='Sędziowie'
			priority='aside'
			isMainPage>
			<Suspense fallback={<LoadingSubpage />}>
				<RefereesList data={sortedRefListData} />
			</Suspense>
		</SectionContainer>
	)
}

export default page
