export type DataStateProps = {
	message: string
}

export type ErrorStateProps = { error: Error; description: string; refetchFn: () => void }
