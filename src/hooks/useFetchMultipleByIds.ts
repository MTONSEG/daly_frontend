import { getData } from '@/services/axios.config'
import { IProduct, IResponse } from '@/types/types'

export const useFetchMultipleByIds = async (
	productIds: number[],
	locale: string | string[]
): Promise<IProduct[]> => {
	const productRequests = productIds.map(async (productId) => {
		try {
			const product = await getData<IResponse<IProduct>>(
				`/products/${productId}?locale=${locale}&populate=images,properties,category,brand,product_comments&populate[2]=localizations.images,localizations.properties,localizations.category,localizations.brand,localizations.product_comments`
			)
			return product.data
		} catch (e: unknown) {
			if (typeof e === 'string') {
				console.error(e.toUpperCase())
			} else if (e instanceof Error) {
				console.error(e.message)
			}
			// Return a placeholder value (e.g., null) when an error occurs
			return null
		}
	})

	const fetchedProducts = await Promise.all(productRequests)

	const validProducts = fetchedProducts.filter((product) => product !== null) as IProduct[]

	return validProducts
}
