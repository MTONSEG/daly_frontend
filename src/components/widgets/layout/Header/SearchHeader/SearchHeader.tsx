import './SearchHeader.scss'
import AsyncSelect from 'react-select/async'
// import { ActionMeta, SingleValue } from 'react-select'
// import { getData } from '@/services/axios.config'
// import { useState } from 'react'
// import { ISelectOption } from '@/types/types'

const SearchHeader = () => {
	// const [options, setOptions] = useState<ISelectOption[]>([])

	// const handleChange = (
	// 	value: SingleValue<string>,
	// 	meta: ActionMeta<ISelectOption>
	// ) => {
	// 	console.log(value, meta)
	// }

	// const loadOptions = (value: string, cb: (options: ISelectOption[]) => void) => {
	// 	console.log(value)

	// 	const data = new Promise((reject, resolve) => {
	// 		getData(`/products?filters[title][$containsi]=${value}`)
	// 			.then((res) => {
	// 				console.log(res)
	// 			})
	// 			.catch((e) => {
	// 				reject(e)
	// 			})
	// 	})

	// 	console.log(data)
	// }

	return (
		<div className='search-header'>
			<AsyncSelect
				cacheOptions
				className='search-header__field'
				// loadOptions={loadOptions}
				// onChange={handleChange}
				// options={options}
			/>
		</div>
	)
}

export default SearchHeader
