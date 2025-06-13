export type InputProps = {
	label: string
	placeholder?: string
	type?: string
	textarea?: boolean
	hasError?: boolean
	errorMessage?: string
	classNames?: string
	required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type RadioButtonProps = {
	label: string
	name: string
	value: string
	hasError?: boolean
	errorMessage?: string
	required?: boolean
	classNames?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export type SelectProps = {
	label: string
	options: { label: string; value: string; disabled?: boolean }[]
	hasError?: boolean
	errorMessage?: string
	required?: boolean
	classNames?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>
