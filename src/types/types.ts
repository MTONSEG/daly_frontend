import { ComponentType, SVGProps } from 'react'

export interface IProductImage {
	id: number
	url: string
}

// Update the IProductProperties type definition
export interface IProductProperties {
	id: number
	memory: string
	ram: string
	resolution: string
	color: string
	cpu: string
	diagonale: string
	display: string
	[key: string]: string | number // Index signature to allow any string as property name
}

// export type IComment = {

// }

export type IProductComments = {
	id: number
	attributes: {
		text: string
		rating: number
		product: string
		author: string
		email: string
		name: string
	}
}

export type IBrand = {
	id: number
	attributes: {
		name: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		label: string
		locale: string
	}
}

export type IProductLocales = {
	data: IProduct[]
}

export interface IProduct {
	id: number
	attributes: {
		title: string
		description: string
		price: number
		discount?: number
		rating: number
		stock: number
		thumbnail: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		hit: false
		images?: IProductImage[]
		properties?: IProductProperties
		category?: { data: ICategory }
		product_comments?: { data: IComment[] }
		brand?: { data: IBrand }
		localizations?: IProductLocales
	}
}

export interface IMetaData {
	pagination: IMetaPagination
}

export interface IMetaPagination {
	page: number
	pageSize: number
	pageCount: number
	total: number
}

export interface IResponse<T> {
	data: T
	meta: IMetaData
}

export interface ICategory {
	id: number
	attributes: {
		name: string
		createdAt: string
		updatedAt: string
		publishedAt: string
		locale: string
		label: string
		products?: { data: IProduct[] }
	}
}

export interface IMapIcons {
	[key: string]: ComponentType<SVGProps<SVGSVGElement>>
}

export interface IFilter {
	id: number
	attributes: {
		name: string
		label: string
		min_price: number
		max_price: number
		createdAt: string
		updatedAt: string
		publishedAt: string
		stock: number
		locale: string
		brands: {
			id: number
			active: boolean
			brand: {
				id: number
				data: IBrand
			}
		}[]
		categories: {
			id: number
			active: boolean
			category: {
				id: number
				data: ICategory
			}
		}[]
		options: {
			id: number
			title: string
			active: boolean
		}[]
	}
}

export interface ISelectOption {
	id: string
	value: string
	label: string
	isFixed?: boolean
	isDisabled?: boolean
}

export interface IComment {
	text: string
	email: string
	rating: number
	author: object
	name: string
	product: number[]
	updatedAt?: string
}

export interface ILogos {
	data: {
		attributes: {
			brandsLogo: {
				data: {
					attributes: {
						url: string
					}
				}[]
			}
		}
	}
}
export interface ITerms {
	data: {
		attributes: {
			termsImage: {
				data: {
					attributes: {
						url: string
					}
				}[]
			}
		}
	}
}

export interface ISubscribe {
    data: {
     subscriber: string,
	 subscribe: boolean
    }
 }

 export interface ISuport {
	data: {
		fullname: string,
		phone: number,
		email: string,
		text: string
	}
 }
