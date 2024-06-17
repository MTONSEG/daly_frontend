// 'use client'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// import { IProduct, IResponse } from '@/types/types'

// const useDataFetch = (url: string) => {
// 	const [data, setData] = useState<IResponse<IProduct> | null>(null)
// 	const [error, setError] = useState<Error | null>(null)
// 	const [isLoading, setLoading] = useState<boolean>(false)

// 	const fetchData = async () => {
// 		setLoading(true)
// 		try {
// 			const response = await axios.get(url, {
// 				headers: {
// 					Authorization: `Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1`
// 				}
// 			})
// 			setData(response.data)
// 		} catch (e: unknown) {
// 			// https://stackoverflow.com/questions/54649465/how-to-do-try-catch-and-finally-statements-in-typescript
// 			if (typeof e === 'string') {
// 				e.toUpperCase()
// 			} else if (e instanceof Error) {
// 				e.message
// 				setError(e)
// 			}
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchData()
// 	}, [url,fetchData])

// 	const refetch = () => {
// 		fetchData()
// 	}

// 	return { data, error, isLoading, refetch }
// }

// export default useDataFetch
'use client'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { IProduct, IResponse } from '@/types/types'

const useDataFetch = (url: string) => {
	const [data, setData] = useState<IResponse<IProduct> | null>(null)
	const [error, setError] = useState<Error | null>(null)
	const [isLoading, setLoading] = useState<boolean>(false)

	const fetchData = useCallback(async () => {
		setLoading(true)
		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1`
				}
			})
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
	}, [url])

	useEffect(() => {
		fetchData()
	}, [url, fetchData])

	const refetch = () => {
		fetchData()
	}

	return { data, error, isLoading, refetch }
}

export default useDataFetch
