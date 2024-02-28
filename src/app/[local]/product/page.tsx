'use client'
import Input from '@/components/ui/forms/Input/Input'
import InputContainer from '@/components/ui/forms/InputContainer/InputContainer'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const Product = () => {
	const t = useTranslations('inputErrors')

	const [value, setValue] = useState('')
	const [error, setError] = useState<string>('')

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		if (e.target.value.length < 5) {
			setError(t('>length'))
		} else if (e.target.value.length > 7) {
			setError(t('<length'))
		} else {
			setError(t('ok'))
		}
	}

	return (
		<div style={{ width: '100%' }}>
			<InputContainer
				placeholder='default'
				value={value}
				onChange={onChangeHandler}
				type='text'
				label='test'
				name='testInput'
				error={error}
			></InputContainer>
		</div>
	)
}

export default Product
