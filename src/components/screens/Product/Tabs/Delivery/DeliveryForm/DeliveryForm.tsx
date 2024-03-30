import { useGetAdressesMutation } from '@/store/api/novaPost.api'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import AsyncSelect from 'react-select/async'
import Select, { StylesConfig } from 'react-select'
import Button from '@/components/ui/buttons/Button/Button'
import { generateDate } from '@/utils/generateDate'

const workingHours = [
	{ value: '10.00', label: '10.00 - 14.00' },
	{ value: '14.00', label: '14.00 - 18.00' },
	{ value: '18.00', label: '18.00 - 22.00' }
]

const availibleDate = [
	{ value: 'today+1', label: generateDate(1) },
	{
		value: 'today+2',
		label: generateDate(2)
	},
	{
		value: 'today+3',
		label: generateDate(3)
	},
	{
		value: 'today+4',
		label: generateDate(4)
	},
	{
		value: 'today+5',
		label: generateDate(5)
	},
	{
		value: 'today+6',
		label: generateDate(6)
	}
]

const DeliveryForm = () => {
	const loadOptions = (
		inputValue: string,
		callback: (options: { label: string; value: string }[]) => void
	) => {
		callback(filterAdresses(inputValue))
	}

	const t = useTranslations('shared')
	const tD = useTranslations('delivery')

	const [adresses, setAdresses] = useState<{ value: string; label: string }[]>()
	const [getAdresses] = useGetAdressesMutation()

	const [isChoosen, setIsChosen] = useState({
		city: false,
		date: false,
		time: false,
		adress: false
	})

	const onCityChangeHandler = async (city: string) => {
		const res = await getAdresses({ city: city }).unwrap()

		setAdresses(() =>
			res.data.map((el) => {
				return { value: el.DescriptionRu, label: el.DescriptionRu }
			})
		)
	}

	const colourStyles: StylesConfig = {
		dropdownIndicator: (base, props) => {
			return {
				...base,
				transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
				transition: '0.3s'
			}
		},
		control: (base) => {
			return { ...base, borderRadius: '10px' }
		},
		singleValue: (base) => {
			return { ...base, color: 'rgb(54, 58, 69)', fontSize: '14px' }
		},
		valueContainer: (base) => {
			return { ...base, padding: '12px 15px' }
		}
	}

	const filterAdresses = (inputValue: string) => {
		return adresses
			? adresses.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
			: []
	}

	return (
		<form
			id='courier-form'
			className='courier__form'
			onSubmit={() => {
				// не понимаю,куда оно должно вести
			}}
		>
			<div className='select-container'>
				<p className='select-label'>{tD('destinationCity')}</p>
				<Select
					required
					onChange={(newValue) => {
						setIsChosen((prev) => {
							return { ...prev, city: true }
						})
						const val = newValue as { value: string; label: string }

						onCityChangeHandler(val.value)
					}}
					styles={colourStyles}
					className='select'
					defaultValue={{ value: 'choose_city', label: tD('chooseCity') }}
					options={[
						{ value: 'харків', label: tD('destinationCityKh') },
						{ value: 'дніпро', label: tD('destinationCityDn') },
						{ value: 'київ', label: tD('destinationCityKiev') }
					]}
				/>
			</div>

			<div className='selects-line'>
				<div className='select-container'>
					<p className='select-label'>{tD('date')}</p>
					<Select
						onChange={() => {
							setIsChosen((prev) => {
								return { ...prev, date: true }
							})
						}}
						styles={colourStyles}
						defaultValue={{ value: 'Date', label: tD('date') }}
						options={availibleDate}
					/>
				</div>

				<div className='select-container'>
					<p className='select-label'>{tD('time')}</p>
					<Select
						onChange={() => {
							setIsChosen((prev) => {
								return { ...prev, time: true }
							})
						}}
						styles={colourStyles}
						defaultValue={{ value: 'Time', label: tD('time') }}
						options={workingHours}
					/>
				</div>
			</div>

			<div className='select-container'>
				<p className='select-label'>{tD('adress')}</p>
				<AsyncSelect
					isDisabled={isChoosen.city && isChoosen.date && isChoosen.time ? false : true}
					onChange={() =>
						setIsChosen((prev) => {
							return { ...prev, adress: true }
						})
					}
					placeholder={t('search-placeholder')}
					loadingMessage={() => t('searching')}
					noOptionsMessage={() => t('no-searched')}
					styles={colourStyles}
					defaultValue={{ value: 'Adress', label: tD('adress') }}
					loadOptions={loadOptions}
					defaultOptions={adresses}
				/>
			</div>

			<Button
				disabled={
					isChoosen.adress && isChoosen.city && isChoosen.date && isChoosen.time ? false : true
				}
				variant='product'
				type='submit'
				onClick={(e) => {
					e.preventDefault()
				}}
			>
				{tD('buyBtn')}
			</Button>
		</form>
	)
}

export default DeliveryForm
