'use client'
import './SearchHeader.scss'
import { useParams } from 'next/navigation'
import { checkArr } from '@/utils/checkArr'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { searchProduct } from '@/store/header/header.api'
import AsyncSelect from 'react-select/async'
import { ISelectOption } from '@/types/types'

const SearchHeader = () => {
	const dispatch = useAppDispatch()
	const id = Date.now().toString()

	const { searchList } = useAppSelector((state) => state.header)
	const { locale } = useParams()

	const loadOptions = (value: string) =>
		new Promise<ISelectOption[]>((resolve) => {
			dispatch(searchProduct({ title: value, locale: checkArr(locale) })).then(
				() => resolve(searchList)
			)
		})

	return (
		<div className='search-header'>
			<AsyncSelect
				id={id}
				instanceId={id}
				unstyled
				cacheOptions
				loadOptions={loadOptions}
				className='search-header__select'
				loadingMessage={() => 'Загрузка'}
			/>
		</div>
	)
}

export default SearchHeader
