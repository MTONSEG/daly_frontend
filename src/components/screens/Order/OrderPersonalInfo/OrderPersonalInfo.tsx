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
	const [phoneNumber, setPhoneNumber] = useState<string | undefined>()
	const [email, setEmail] = useState<string | undefined>()

	const [nameError, setNameError] = useState<string | undefined>()
	const [surnameError, setSurnameError] = useState<string | undefined>()
	const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>()
	const [emailError, setEmailError] = useState<string | undefined>()

	const debouncedName = useDebounce(name, 500)
	const debouncedSurname = useDebounce(surname, 500)
	const debouncedPhoneNumber = useDebounce(phoneNumber, 500)
	const debouncedEmail = useDebounce(email, 500)

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

	const validateName = (value: string) => {
		if (!value) {
			setNameError(w('input-error-empty'))
		} else {
			setNameError(undefined)
		}
	}

	const validateSurname = (value: string) => {
		if (!value) {
			setSurnameError(w('input-error-empty'))
		} else {
			setSurnameError(undefined)
		}
	}

	const validatePhoneNumber = (value: string | undefined) => {
		console.log('🚀 ~ validatePhoneNumber ~ value:', value)
		if (!value) {
			setPhoneNumberError(w('input-error-empty'))
		} else {
			let error = ''
			if (value.length < 9) {
				error = 'Phone number should be at least 9 digits.'
				setPhoneNumberError(error) // Set the error state
				return
			} else if (!value.match(/^[\d\s()+-]+$/)) {
				error = 'Please enter a valid phone number.'
				setPhoneNumberError(error) // Set the error state
				return
			}
			setPhoneNumberError(undefined) // Set the error state
			setPhoneNumber(value)
		}
	}

	const validateEmail = (value: string | undefined) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!value) {
			setEmailError(w('email-error-empty'))
		} else if (!emailRegex.test(value)) {
			setEmailError(w('email-error-invalid'))
		} else {
			setEmailError(undefined)
		}
	}

	const onChange = <T extends string | number | boolean | Date | undefined>(
		setter: StateSetter<T>,
		validator?: (value: T) => void
	) => {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value as T
			setter(value)
			if (validator) {
				validator(value)
			}
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
					onChange={onChange(setName, validateName)}
					inputClassName='order-block__input'
					error={nameError}
				/>
				<Input
					type={'text'}
					label={word('title-2')}
					name='surname'
					placeholder={word('placeholder-2')}
					onChange={onChange(setSurname, validateSurname)}
					inputClassName='order-block__input'
					error={surnameError}
				/>
				<Input
					type={'number'}
					label={word('title-3')}
					name='phone number'
					placeholder={word('placeholder-3')}
					onTelChange={validatePhoneNumber}
					inputClassName='order-block__input'
					error={phoneNumberError}
				/>
				<Input
					type='email'
					label={word('title-4')}
					name='email'
					placeholder={word('placeholder-4')}
					onChange={onChange(setEmail, validateEmail)}
					inputClassName='order-block__input'
					error={emailError}
				/>
			</div>
		</div>
	)
}

export default OrderPersonalInfo
