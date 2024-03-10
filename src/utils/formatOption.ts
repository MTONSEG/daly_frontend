import type { ISelectOption } from '@/types/types'

export const formatOption = (title: string, id?: string): ISelectOption => ({
	id: id ? id : title.toLowerCase(),
	label: title,
	value: title.toLowerCase()
})
