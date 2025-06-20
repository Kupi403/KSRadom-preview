export type OptionsType<T extends string | number = string> = {
	value: T
	caption: string
	default?: boolean
	disabled?: boolean
}

export type OptionProps<T extends string | number = string> = {
	title?: string
	options: OptionsType<T>[]
	value: T
	setValue: (value: T) => void
	loading?: boolean
}

