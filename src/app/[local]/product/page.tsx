'use client'
import Select from '@/components/ui/forms/Select/Select'
// import useInput from '@/hooks/useInput'
// import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const Product = () => {
	const [value, setValue] = useState('0')

	// const t = useTranslations('inputErrors')
	// const { value, setValue, error, setError } = useInput('')

	// const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	// 	setValue(e.target.value)

	// 	if (e.target.value.length < 5) {
	// 		setError(t('>length'))
	// 	} else if (e.target.value.length > 7) {
	// 		setError(t('<length'))
	// 	} else {
	// 		setError(t('ok'))
	// 	}
	// }

	return (
		<div style={{ width: '100%' }}>
			<Select
				value={value}
				setValue={setValue}
				defValue='0'
				valuesArr={['1', '2']}
			/>
		</div>
	)
}

export default Product
