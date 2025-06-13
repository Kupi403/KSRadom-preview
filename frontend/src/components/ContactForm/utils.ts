export const isNotEmpty = (value: string) => value.trim() !== ''
export const isEmail = (value: string) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
export const isPhoneNumber = (value: string) => /^\+?[0-9\s-]{7,15}$/.test(value)
