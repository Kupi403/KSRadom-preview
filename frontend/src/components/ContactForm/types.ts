export type InputState = {
	value: string
	isTouched: boolean
}

export type Action = { type: 'INPUT'; value: string } | { type: 'BLUR' } | { type: 'RESET' }

export enum RADIO_BUTTONS {
	NO = 'Nie',
	YES = 'Tak',
}
