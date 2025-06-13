export type RefereeType = {
	id: number
	name: string
	surname: string
	phoneNumber: string
	city: string
}
export type RefereesListPropsType = {
	data: {
		league: string
		referees: RefereeType[]
	}[]
}
export type RefereeCardPropsType = {
	referee: RefereeType
	idx?: number
}

export type RefereeGroupPropsType = {
	leagueName: string
	referees: RefereeType[]
}
