import { ComponentType, SVGProps } from 'react'

export interface IProductImage {
	id: number
	url: string
}

export type IProductProperties = {
	id: number
	memory: string
	ram: string
	resolution: string
	color: string
	cpu: string
	diagonale: string
	display: string
}

export type IProductComments = {
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
		product_comments?: { data: IProductComments }
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
}
