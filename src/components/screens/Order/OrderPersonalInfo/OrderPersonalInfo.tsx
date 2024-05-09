'use client'
import './OrderPersonalInfo.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Input from '@/components/ui/forms/Input/Input'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { fillPersonalData } from '@/store/order/order.slice'
import { useDebounce } from '@/hooks/useDebounce'

type StateSetter<T> = Dispatch<SetStateAction<T>>

const OrderPersonalInfo = () => {
	const w = useTranslations('order')
	const word = useTranslations('personal-info')
	const dispatch = useAppDispatch()

	const [name, setName] = useState<string>('')
	const [surname, setSurname] = useState<string>('')
	const [phoneNumber, setPhoneNumber] = useState<number | undefined>()
	const [email, setEmail] = useState<string | undefined>()

	const debouncedName = useDebounce(name, 1000)
	const debouncedSurname = useDebounce(surname, 1000)
	const debouncedPhoneNumber = useDebounce(phoneNumber, 1000)
	const debouncedEmail = useDebounce(email, 1000)

	useEffect(() => {
		dispatch(
			fillPersonalData({
				name: debouncedName,
				surname: debouncedSurname,
				email: debouncedEmail,
				phoneNumber: debouncedPhoneNumber
			})
		)
	}, [debouncedName, debouncedSurname, debouncedEmail, debouncedPhoneNumber, dispatch])

	const onChange = <T extends string | number | boolean | Date | undefined>(
		setter: StateSetter<T>
	) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setter(e.target.value as T)
		}
	}

	return (
		<div className='order-block'>
			<div className='order-block__title'>{w('personal-title')}</div>
			<div className='order-block__content'>
				<Input
					type={'text'}
					label={word('title-1')}
					name='name'
					placeholder={word('placeholder-1')}
					onChange={onChange(setName)}
					inputClassName='order-block__input'
				/>
				<Input
					type={'text'}
					label={word('title-2')}
					name='phone number'
					placeholder={word('placeholder-2')}
					onChange={onChange(setSurname)}
					inputClassName='order-block__input'
				/>
				<Input
					type={'number'}
					label={word('title-3')}
					name='phone number'
					placeholder={word('placeholder-3')}
					onChange={onChange(setPhoneNumber)}
					inputClassName='order-block__input'
				/>
				<Input
					type='email'
					label={word('title-4')}
					name='phone number'
					placeholder={word('placeholder-4')}
					onChange={onChange(setEmail)}
					inputClassName='order-block__input'
				/>
			</div>
		</div>
	)
}

export default OrderPersonalInfo
