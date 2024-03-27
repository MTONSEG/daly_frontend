import React, { useState } from 'react'
import TabHead from '../TabStructure/TabHead'
import TabContent from '../TabStructure/TabContent'
import { ITab } from '../Tabs'
import Button from '@/components/ui/buttons/Button/Button'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { TelIcon } from '@/components/ui/icons'
import './Delivery.scss'
import Select, { StylesConfig } from 'react-select'
import AsyncSelect from 'react-select/async'
import { useGetAdressesMutation } from '../../../../../store/api/novaPost.api'
import { useTranslations } from 'next-intl'

const Courier = () => {
	const generateDate = (numberOfDaysToAdd: number) => {
		const currentDate = new Date()

		const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

		if (currentDate.getDate() + numberOfDaysToAdd > daysInMonth(2024, currentDate.getMonth() + 1)) {
			const difference =
				currentDate.getDate() + numberOfDaysToAdd - daysInMonth(2024, currentDate.getMonth() + 1)
			currentDate.setMonth(currentDate.getMonth() + 1)
			currentDate.setDate(1 + difference)

			return new Date(
				`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() - 1}`
			).toLocaleString('default', {
				day: 'numeric',
				month: 'long'
			})
		} else {
			return new Date(
				`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
					currentDate.getDate() + numberOfDaysToAdd
				}`
			).toLocaleString('default', {
				day: 'numeric',
				month: 'long'
			})
		}
	}

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

	const loadOptions = (
		inputValue: string,
		callback: (options: { label: string; value: string }[]) => void
	) => {
		callback(filterAdresses(inputValue))
	}

	return (
		<div className='courier'>
			<div className='courier__left'>
				<form id='courier-form' className='courier__form'>
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
				<LinkBtn href='' className='courier__link'>
					{tD('linkText')}
				</LinkBtn>
			</div>
		</div>
	)
}

const Pickup = () => {
	const tD = useTranslations('delivery')

	return (
		<div className='pickup'>
			<h2 className='pickup__title'>{tD('goodAvailibility')}</h2>
			<div className='pickup__content'>
				<div className='pickup__adress'>
					<p className='pickup__city'>{tD('templateAdress')}</p>
					<div className='pickup__time'>{tD('workWeek')}</div>
					<a className='pickup__tel' href='tel:+38 (968) 430-88-20'>
						<TelIcon /> <span>+38 (968) 430-88-20</span>
					</a>
				</div>
				<iframe
					className='pickup__iframe'
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325516.3770455823!2d30.532690549999998!3d50.402035500000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2z0JrQuNC10LIsIDAyMDAw!5e0!3m2!1sru!2sua!4v1710948316581!5m2!1sru!2sua'
					loading='lazy'
				></iframe>
			</div>
		</div>
	)
}

const Delivery = () => {
	const tD = useTranslations('delivery')

	const tabs: ITab[] = [
		{
			title: tD('delivery'),
			content: <Courier />
		},
		{
			title: tD('pickup'),
			content: <Pickup />
		}
	]

	const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

	return (
		<div className='delivery'>
			<TabHead tabs={tabs} activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex} />
			<TabContent tabs={tabs} activeTabIndex={activeTabIndex} />
		</div>
	)
}

export default Delivery
