'use client'
import Textarea from '@/components/ui/forms/Textarea/Textarea'
import useInput from '@/hooks/useInput'
import { useTranslations } from 'next-intl'
import React from 'react'

const Product = () => {
	const t = useTranslations('inputErrors')
	const { value, setValue, error, setError } = useInput('')

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
			<Textarea
				placeholder='default'
				value={value}
				onChange={onChangeHandler}
				label='test'
				name='testInput'
				error={error}
			></Textarea>
		</div>
	)
}

export default Product
