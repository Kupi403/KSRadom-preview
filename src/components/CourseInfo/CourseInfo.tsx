'use client'

import useFetchCourseInfo from '@/hooks/ReactQuery/useFetchCourseInfo'
import styles from './CourseInfo.module.scss'
import LoadingSubpage from '../UI/Loading/LoadingSubpage'
import ErrorComponent from '../UI/States/Error'
import { DateFormat, getLocaleDate } from '../Calendar/utils'
import CourseForm from '../ContactForm/CourseForm'
import Description from '../NewsDetails/Description/Description'

const CourseInfo = () => {
	const { data: courseInfo, isLoading, isError, error, refetch } = useFetchCourseInfo()

	const date = courseInfo?.dueDate
		? getLocaleDate(
				new Date(courseInfo?.dueDate),
				courseInfo.isOfficialDate ? DateFormat.FULL_DATE : DateFormat.MONTH_AND_YEAR
		  )
		: null

	if (isLoading) return <LoadingSubpage />
	if (isError)
		return (
			<ErrorComponent
				description='Błąd pobierania informacji o kursie.'
				error={error}
				refetchFn={refetch}
			/>
		)

	return (
		<div className={styles['course-info']}>
			<div className={styles.box}>
				{date && (
					<div className={styles.date}>
						<h3>Najbliższy termin kursu sędziowskiego</h3>
						<p>{date}</p>
					</div>
				)}
				{courseInfo && <Description content={courseInfo.description} />}
			</div>
			<div className={styles.form}>
				<h2 className={styles.subtitle}>{`Zapisz się na kurs sędziowski ${courseInfo?.season.name}`}</h2>
				<CourseForm />
			</div>
		</div>
	)
}

export default CourseInfo
