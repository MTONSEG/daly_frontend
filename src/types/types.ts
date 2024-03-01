import { ComponentType, SVGProps } from 'react'

export type IImage = {
	id: number
	url: string
}

export type IProperties = {
	id: number
	memory: string
	ram: string
	resolution: string
	color: string
	cpu: string
	diagonale: string
	display: string
}

export type IProductCategory = {
	data: {
		id: number
		attributes: {
			name: string
			createdAt: string
			updatedAt: string
			publishedAt: string
			locale: string
			label: string
		}
	}
}
export type IProductComments = {
	data: {
		id: number
		attributes: {
			text: string
			rating: number
			product: string
			author: string
			email: string
			name: string
		}[]
	}
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
        images?: IImage[]
		properties?: IProperties
		category?: IProductCategory
		product_comments?: IProductComments
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
	data: T[]
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
