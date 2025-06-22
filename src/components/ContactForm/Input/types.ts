type BaseFieldProps = {
	label: string
	required?: boolean
	classNames?: string
	hasError?: boolean
	errorMessage?: string
}

export type InputProps = BaseFieldProps & {
	placeholder?: string
	type?: string
	textarea?: boolean
} & React.InputHTMLAttributes<HTMLInputElement> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>

export type RadioButtonProps = BaseFieldProps & {
	name: string
	value: string
} & React.InputHTMLAttributes<HTMLInputElement>

export type SelectProps = BaseFieldProps & {
	options: { label: string; value: string; disabled?: boolean }[]
} & React.SelectHTMLAttributes<HTMLSelectElement>

export type CheckboxProps = BaseFieldProps & {
	name: string
	value: string
	checked: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

// export type InputProps = {
// 	label: string
// 	placeholder?: string
// 	type?: string
// 	textarea?: boolean
// 	hasError?: boolean
// 	errorMessage?: string
// 	classNames?: string
// 	required?: boolean
// } & React.InputHTMLAttributes<HTMLInputElement> &
// 	React.TextareaHTMLAttributes<HTMLTextAreaElement>

// export type RadioButtonProps = {
// 	label: string
// 	name: string
// 	value: string
// 	hasError?: boolean
// 	errorMessage?: string
// 	required?: boolean
// 	classNames?: string
// } & React.InputHTMLAttributes<HTMLInputElement>

// export type SelectProps = {
// 	label: string
// 	options: { label: string; value: string; disabled?: boolean }[]
// 	hasError?: boolean
// 	errorMessage?: string
// 	required?: boolean
// 	classNames?: string
// } & React.SelectHTMLAttributes<HTMLSelectElement>

// export type CheckboxProps = {
// 	label: string
// 	name: string
// 	value: string
// 	checked?: boolean
// 	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
// 	required?: boolean
// 	classNames?: string
// 	hasError?: boolean
// 	errorMessage?: string
// } & React.InputHTMLAttributes<HTMLInputElement>
