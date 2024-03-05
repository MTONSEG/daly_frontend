import type { ISelectOption } from '@/types/types'

export const formatOption = (title: string): ISelectOption => ({
	label: title,
	value: title.toLowerCase()
})
