'use client'

import './SearchHeader.scss'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { checkArr } from '@/utils/checkArr'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { searchProduct } from '@/store/header/header.api'
import type { ISelectOption } from '@/types/types'
import { useRouter } from '@/navigation'
import { PRODUCT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { CSSProperties } from 'react'

const AsyncSelect = dynamic(() => import('react-select/async'))

const SearchHeader = () => {
	const dispatch = useAppDispatch()
	const { searchList } = useAppSelector((state) => state.header)

	const t = useTranslations('shared')

	const { locale } = useParams()

	const { push } = useRouter()

	const loadOptions = (value: string) =>
		new Promise<ISelectOption[]>((resolve) => {
			dispatch(searchProduct({ title: value, locale: checkArr(locale) }))
				.then(() => resolve(searchList))
				.catch((e) => {
					console.log(e)
				})
		})

	const handleChange = (value: ISelectOption) => {
		push(`/${PRODUCT_PATH}/${value.id}`)
	}

	return (
		<AsyncSelect
			unstyled
			className='search-header'
			classNamePrefix='search-header'
			cacheOptions
			loadOptions={loadOptions}
			placeholder={t('search')}
			loadingMessage={() => t('searching')}
			noOptionsMessage={() => t('no-searched')}
			onChange={(value) => {
				handleChange(value as ISelectOption)
			}}
			components={{
				DropdownIndicator: null,
				IndicatorSeparator: null
			}}
			styles={{
				control: (base) => ({
					...base,
					cursor: 'pointer'
				})
			}}
		/>
	)
}

export default SearchHeader
