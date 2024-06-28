import { IFilter } from '@/types/types'

type FilterHandler = (filter: IFilter) => string

export const filtersQueryBuilder = (
	filters: IFilter[],
	locale: string | string[],
	sorting: 'publishedAt' | 'price' | 'rating' = 'publishedAt',
	sortingWay: 'asc' | 'desc' = 'desc',
	page: number,
	limit: number,
	start?: number,
	isDiscounted?: string | null
): string => {
	const baseurl = `http://localhost:1337/api/products?locale=${locale}&populate=images,properties,category,brand,product_comments`

	const filterHandlers: { [key: string]: FilterHandler } = {
		price: (filter) =>
			`filters[price][$gt]=${filter.attributes.min_price}&filters[price][$lt]=${filter.attributes.max_price}`,
		brand: (filter) =>
			filter.attributes.brands
				.filter((item) => item.active)
				.map((item) => `filters[brand][name][$eq]=${item.brand.data.attributes.name}`)
				.join('&'),
		category: (filter) =>
			filter.attributes.categories
				.filter((item) => item.active)
				.map((item) => `filters[category][name][$eq]=${item.category.data.attributes.name}`)
				.join('&'),
		stock: () => 'filters[stock][$gt]=0',
		default: (filter) =>
			filter.attributes.options
				.filter((option) => option.active)
				.map((option) => `filters[properties][${filter.attributes.name}][$eq]=${option.title}`)
				.join('&')
	}

	const filterQueries = filters?.map((filter) => {
		const handler = filterHandlers[filter.attributes.name] || filterHandlers.default
		return handler(filter)
	}) || []

	// remove the empty strings
	const validFilterQueries = filterQueries.filter((query) => query !== '')

	const paginationFilter = `${
		start
			? `&pagination[start]=${start}&pagination[limit]=${limit}`
			: `&pagination[page]=${page}&pagination[pageSize]=${limit}`
	}`

	const sortingFilter = sorting ? `sort=${sorting}:${sortingWay}` : undefined
	const discountFilter = isDiscounted === 'true' ? `filters[discount][$gt]=0` : undefined

	// Build the final query string by including only the defined filters
	const queryParams = [...validFilterQueries, sortingFilter, paginationFilter, discountFilter]
		.filter(Boolean)
		.join('&')

	return `${baseurl}&${queryParams}`
}
