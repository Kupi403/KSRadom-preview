import { OptionsType } from "../UI/Buttons/Options/types"

export const SORT_OPTIONS: OptionsType<'asc' | 'desc'>[] = [
	{ value: 'desc', caption: 'Od najnowszych', default: true },
	{ value: 'asc', caption: 'Od najstarszych' },
]
