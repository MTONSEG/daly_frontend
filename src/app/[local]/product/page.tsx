'use client'
import Input from '@/components/ui/forms/Inputs/Input'
import React, { useState } from 'react'

const Product = () => {
	const [value, setValue] = useState('')
	const [error, setError] = useState<string>('')

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		if (e.target.value.length < 5) {
			setError('length is not enough')
		} else if (e.target.value.length > 7) {
			setError('too much')
		} else {
			setError('')
		}
	}

	return (
		<Input
			placeholder='default'
			value={value}
			onChange={onChangeHandler}
			type='text'
			label='test'
			name='testInput'
			error={error}
		></Input>
	)
}

export default Product
