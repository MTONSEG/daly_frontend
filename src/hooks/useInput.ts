import { useState } from 'react'

const useInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue)
	const [error, setError] = useState<string>('')

	return {
		value,
		setValue,
		error,
		setError
	}
}

export default useInput
