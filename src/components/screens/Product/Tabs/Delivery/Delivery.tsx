import React, { useEffect, useState } from 'react'
import TabHead from '../TabStructure/TabHead'
import TabContent from '../TabStructure/TabContent'
import { ITab } from '../Tabs'
import Button from '@/components/ui/buttons/Button/Button'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { PhoneIcon, TelIcon } from '@/components/ui/icons'
import './Delivery.scss'
import Select, { StylesConfig } from 'react-select'
import makeAnimated from 'react-select/animated'
import AsyncSelect from 'react-select/async'
// import './Select.scss'

// product-card

const Courier = () => {
	// const [city, setCity] = useState('Выберите город')
	// const [date, setDate] = useState('')
	// const [time, setTime] = useState('')
	const [adresses, setAdresses] = useState<{ DescriptionRu: 'string' }[]>([])

	const getPostData = async (city: string) => {
		const apiKey = '9fcce71e3d084a1fdaefeadde3261f11'
		const apiUrl = 'https://api.novaposhta.ua/v2.0/json/'

		const requestData = {
			apiKey: apiKey,
			modelName: 'Address',
			calledMethod: 'getWarehouses',
			methodProperties: {
				Limit: 50,
				CityName: city
			}
		}

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'User-Agent': 'Mozilla/5.0'
			},
			body: JSON.stringify(requestData)
		}

		await fetch(apiUrl, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to fetch departments. Status code: ${response.status}`)
				}
				return response.json()
			})
			.then((data) => {
				const departments = data.data
				console.log(departments)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	useEffect(() => {
		const getAdresses = async () => {
			const adresses = await getPostData('харків')
			setAdresses(adresses)
		}

		getAdresses()
	}, [])

	const animatedComponents = makeAnimated()

	const colourStyles: StylesConfig = {
		dropdownIndicator: (base, props) => {
			return {
				...base,
				transform: props.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
				transition: '0.3s'
			}
		}
	}

	const filterAdress = (inputValue: string) => {
		return adresses.filter((i) => i.DescriptionRu.toLowerCase().includes(inputValue.toLowerCase()))
	}

	const promiseOptions = (inputValue: string) =>
		new Promise((resolve) => {
			resolve(filterAdress(inputValue))
		})

	return (
		<div className='courier'>
			<div className='courier__left'>
				<form id='courier-form' className='courier__form'>
					<div className='select-container'>
						<p className='select-label'>Город доставки</p>
						<Select
							styles={colourStyles}
							className='select'
							components={animatedComponents}
							defaultValue={{ value: 'choose_city', label: 'choose city' }}
							options={[
								{ value: 'Kharkiv', label: 'Харьков' },
								{ value: 'Dnepr', label: 'Днепр' },
								{ value: 'Kiev', label: 'Киев' }
							]}
						/>
					</div>

					<div className='selects-line'>
						<div className='select-container'>
							<p className='select-label'>Дата</p>
							<Select
								styles={colourStyles}
								defaultValue={{ value: 'Date', label: 'Дата' }}
								options={[
									{
										value: 'x',
										label: 'z'
									}
								]}
							/>
							{/* <MySelect value={date} setValue={setDate} valuesArr={['1', '2', '3']}></MySelect> */}
						</div>

						<div className='select-container'>
							<p className='select-label'>Время</p>
							<Select
								styles={colourStyles}
								defaultValue={{ value: 'Time', label: 'Время' }}
								options={[
									{
										value: '10-14',
										label: '10-14'
									}
								]}
							/>
						</div>

						<div className='select-container'>
							<p className='select-label'>Адресс</p>
							<AsyncSelect
								loadOptions={promiseOptions}
								styles={colourStyles}
								defaultValue={{ value: 'Adress', label: 'Выберете Адресс' }}
								options={[
									{
										value: '10-14',
										label: '10-14'
									}
								]}
							/>
						</div>
					</div>
				</form>
				<LinkBtn href='' className='courier__link'>
					Полные условия доставки
				</LinkBtn>
			</div>
			{/* <div className='courier__right'>
				<div className='courier__right-line'>
					<h2 className='courier__price'>Стоимость доставки</h2>
					<p className='courier__price_text'>Бесплатно</p>
				</div>

				<Button>Купить</Button>

				<p className='courier__etc'>Оплата онлайн, картой или наличными при получении</p>
			</div> */}
		</div>
	)
}

const Pickup = () => {
	return (
		<div className='pickup'>
			<h2 className='pickup__title'>Товар доступен в нашем магазине</h2>
			<div className='pickup__content'>
				<div className='pickup__adress'>
					<p className='pickup__city'>Днепр, ул. Тепличная 8к3</p>
					<div className='pickup__time'>Пн.-Пт: с 10.00 до 21.00 Сб: с 10.00 до 21.00</div>
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
	const tabs: ITab[] = [
		{
			title: 'Доставка ',
			content: <Courier />
		},
		{
			title: 'Самовывоз',
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
