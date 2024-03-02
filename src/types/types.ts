export type IImage = {
	id: number
	url: string
}

export interface IProduct {
	data: {
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
}
