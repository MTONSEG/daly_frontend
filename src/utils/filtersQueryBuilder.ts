import { IFilter } from '@/types/types'

export const filtersQueryBuilder = (filters: IFilter[]): string => {
	console.log('🚀 ~ filtersQueryBuilder ~ filters:', filters)
	let url: string =
		'http://localhost:1337/api/products?populate=images,properties,category,brand,product_comments&pagination[page]=3&pagination[pageSize]=3'
	filters.forEach((filter) => {
		if (filter.attributes.name === 'price') {
			console.log('price')
			url = url.concat(
				`&filters[price][$gt]=${filter.attributes.min_price}&filters[price][$lt]=${filter.attributes.max_price}`
			)
		} else if (filter.attributes.name === 'brand') {
			console.log('brands')
			let brandsUrl: string = ''
			filter.attributes.brands.forEach((brand, index) => {
				if (brand.active) {
					brandsUrl = brandsUrl.concat(
						`&filters[$or][${index}][brand][$eq]=${brand.brand.data.attributes.name}`
					)
				}
			})
			url = url.concat(brandsUrl)
		} else if (filter.attributes.name === 'category') {
			console.log('categories')
			let categoriesUrl: string = ''
			filter.attributes.categories.forEach((category,index) => {
				if (category.active) {
					categoriesUrl = categoriesUrl.concat(
						`&filters[$or][${index}][category][$eq]=${category.category.data.attributes.name}`
					)
				}
			})
			url = url.concat(categoriesUrl)
		} else if (filter.attributes.name === 'stock') {
			console.log('stock')
			url = url.concat(`&filters[stock][$gt]=0`)
		} else {
			console.log(filter.attributes.name + ' option')
			let optionsUrl: string = ''
			filter.attributes.options.forEach((option) => {
				if (option.active) {
					optionsUrl = optionsUrl.concat(
						`&filters[option][$eq]=${option.title}`
					)
				}
			})
			url = url.concat(optionsUrl)
		}
	})
	return url
}
