export type InputState = {
	value: string
	isTouched: boolean
}

export type Action = { type: 'INPUT'; value: string } | { type: 'BLUR' } | { type: 'RESET' }

export enum RadioButtons {
	No = 'Nie',
	Yes = 'Tak',
}

export enum CandidateAges {
	Min = 16,
	Max = 80,
}
