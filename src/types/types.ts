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

export type ICategory = {
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
		category?: ICategory
		product_comments?: IProductComments
	}
}
