'use client'

import './SearchHeader.scss'
// import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { checkArr } from '@/utils/checkArr'
import { useAppDispatch, useAppSelector } from '@/hooks/useReduxHooks'
import { searchProduct } from '@/store/header/header.api'
// const AsyncSelect = dynamic(() => import('react-select/async'), { ssr: false })
import { ISelectOption } from '@/types/types'
import AsyncSelect from '@/components/ui/forms/AsyncSelect/AsyncSelect'

const SearchHeader = () => {
	const dispatch = useAppDispatch()

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
			<AsyncSelect loadOption={loadOptions} />
		</div>
	)
}

export default SearchHeader
