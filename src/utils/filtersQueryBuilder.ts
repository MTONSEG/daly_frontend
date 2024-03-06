import { IFilter } from '@/types/types'

export const filtersQueryBuilder = (
    filters: IFilter[],
    locale: string | string[]
): string => {
    const baseurl = `http://localhost:1337/api/products?locale=${locale}&populate=images,properties,category,brand,product_comments`

    const filterQueries = filters.map((filter) => {
        switch (filter.attributes.name) {
            case 'price':
                return `filters[price][$gt]=${filter.attributes.min_price}&filters[price][$lt]=${filter.attributes.max_price}`
            case 'brand':
                return filter.attributes.brands
                    .filter((item) => item.active)
                    .map(
                        (item) => `filters[brand][name][$eq]=${item.brand.data.attributes.name}`
                    )
                    .join('&')
            case 'category':    
                return filter.attributes.categories
                    .filter((item) => item.active)
                    .map(
                        (item) =>
                            `filters[category][name][$eq]=${item.category.data.attributes.name}`
                    )
                    .join('&')
            case 'stock':
                return 'filters[stock][$gt]=0'
            default:
                return filter.attributes.options
                    .filter((option) => option.active)
                    .map(
                        (option) =>
                            `filters[properties][${filter.attributes.name}][$eq]=${option.title}`
                    )
                    .join('&')
        }
    })

    const validFilterQueries = filterQueries.filter(query => query !== ''); // Filter out empty queries

    return `${baseurl}&${validFilterQueries.join('&')}`
}
