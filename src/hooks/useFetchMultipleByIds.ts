import { getData } from '@/services/axios.config'
import { IProduct, IResponse } from '@/types/types'

export const useFetchMultipleByIds = async (
	productIds: number[],
	locale: string | string[]
): Promise<IProduct[]> => {
	const productRequests = productIds.map(async (productId) => {
		const product = await getData<IResponse<IProduct>>(
			`/products/${productId}?locale=${locale}&populate=images,properties,category,brand,product_comments`
		)
		return product.data
	})

	const fetchedProducts = await Promise.all(productRequests)

	return fetchedProducts
}
