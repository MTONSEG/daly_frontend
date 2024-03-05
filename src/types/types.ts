import { ComponentType, SVGProps } from 'react'

export type IImage = {
	id: number
	url: string
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
		images: IImage[]
		properties?: {
			id: number
			memory: string
			ram: string
			resolution: string
			color: string
			cpu: string
			diagonale: string
			display: string
		}
		category: {
			data: {
				id: 192
				attributes: {
					name: 'smartphones'
					createdAt: '2024-02-26T15:25:26.162Z'
					updatedAt: '2024-02-26T15:27:03.616Z'
					publishedAt: '2024-02-26T15:25:25.831Z'
					locale: 'en'
					label: 'Smartphones'
				}
			}
		}
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
	attributes: ICategoryAttributes
}

export interface ICategoryAttributes {
	name: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	label: string
	products: IProductsCategoryData
}

export interface IProductsCategoryData {
	data: IProductsCategory[]
}

export interface IProductsCategory {
	id: number
	attributes: IProductsCategoryAttributes
}

export interface IProductsCategoryAttributes {
	title: string
	description: string
	price: number
	rating: number
	stock: number
	thumbnail: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	locale: string
	discount: number
	hit: boolean
}

export interface IMapIcons {
	[key: string]: ComponentType<SVGProps<SVGSVGElement>>
}
