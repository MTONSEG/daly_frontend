import { useEffect, useState } from 'react'
import axios from 'axios'

import { IProduct } from '@/types/types'

const useDataFetch = (url: string) => {
	const [data, setData] = useState<IProduct | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setLoading] = useState<boolean>(false)

	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await axios.get(url)
			setData(response.data)
		} catch (e: unknown) {
			// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
			if (typeof e === 'string') {
				e.toUpperCase()
			} else if (e instanceof Error) {
				e.message
				setError(e)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [url])

	const refetch = () => {
		fetchData()
	}

	return { data, error, isLoading, refetch }
}

export default useDataFetch
