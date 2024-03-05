'use client'
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs'
import Container from '@/components/ui/containers/Container/Container'
import Input from '@/components/ui/forms/Input/Input'
import Select from '@/components/ui/forms/Select/Select'
import Textarea from '@/components/ui/forms/Textarea/Textarea'
import SliderThumbNail from '@/components/widgets/SliderThumbnail/SliderThumbnail'
import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import useDataFetch from '@/hooks/useDataFetch'
import useInput from '@/hooks/useInput'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
// import useInput from '@/hooks/useInput'
// import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface IBreadcrumb {
	label: string
	href: string
	active?: boolean
}

const Product = () => {
	// const { value, setValue, error: inputError, setError } = useInput('')
	// const {
	// 	value: textAreaValue,
	// 	setValue: setTextAreaValue,
	// 	error: textareaError,
	// 	setError: setTextareaError
	// } = useInput('')
	// const [selectValue, setSelectValue] = useState('1')
	// const currentPath = usePathname()

	// const t = useTranslations('inputErrors')
	// const productId = 304

	// const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setValue(e.target.value)
	// 	if (e.target.value.length < 5) {
	// 		setError(t('>length'))
	// 	} else if (e.target.value.length > 7) {
	// 		setError(t('<length'))
	// 	} else {
	// 		setError(t('ok'))
	// 	}
	// }

	// const onTextareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	// 	setTextAreaValue(e.target.value)
	// 	if (e.target.value.length < 5) {
	// 		setTextareaError(t('>length'))
	// 	} else if (e.target.value.length > 7) {
	// 		setTextareaError(t('<length'))
	// 	} else {
	// 		setTextareaError(t('ok'))
	// 	}
	// }

	const { data, error, isLoading } = useDataFetch(
		`http://localhost:1337/api/products/${304}?populate=images`
	)

	// const breadcrumbArr: IBreadcrumb[] = [
	// 	{ label: 'test', href: '/', active: false },
	// 	{ label: 'test2', href: `${currentPath}`, active: true }
	// ]

	useEffect(() => {
		console.log(data)
	}, [data])

	if (error) {
		return <div>'Error'</div>
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<Container>
			<div className='slider-container' style={{ margin: '50px auto', height: 570 }}>
				<>
					{/* <Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			{data ? <SliderThumbNail images={data.data.attributes.images} /> : ''}
			<div style={{ width: '150px' }}>
				<Input
					label='input'
					value={value}
					type='text'
					name='testInput'
					error={inputError}
					onChange={onChangeHandler}
				/>
			</div>
			<div style={{ width: '150px', margin: '50px 0 125px 0' }}>
				<Select value={selectValue} setValue={setSelectValue} valuesArr={['1', '2']} />
			</div>
			<div style={{ width: '150px', margin: '50px 0 125px 0' }}>
				<Textarea
					placeholder='default'
					value={textAreaValue}
					onChange={onTextareaChangeHandler}
					label='test'
					name='testInput'
					error={textareaError}
				></Textarea>
			</div> */}
				</>
				{data && <SliderThumbnailFancyApp images={data.data.attributes.images} />}
			</div>
		</Container>
	)
}

export default Product
