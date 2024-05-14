import MiniAcordeon from '@/components/ui/dropdowns/MiniAcordeon/MiniAcordeon'
import { useTranslations } from 'next-intl'
import React, { FC } from 'react'
import './SupportContent.scss'

interface SupportContentProps {
	selectedValue: string
}

const SupportContent: FC<SupportContentProps> = ({ selectedValue }) => {
	const w = useTranslations('support-data')
	const MiniAcordeonsData = [
		{
			heading: w('support-heading'),
			content: w('support-text')
		},
		{
			heading: w('support-heading'),
			content: w('support-text-long')
		},
		{
			heading: w('support-heading'),
			content: w('support-text-long')
		},
		{
			heading: w('support-heading'),
			content: w('support-text')
		},
		{
			heading: w('support-heading'),
			content: w('support-text')
		}
	]

	const RegistrationComponent: FC = () => {
		return (
			<div className='support-content__content'>
				<div className='support-content__title'>{w('support-heading-1')}</div>
				<div className='support-content__drops-wrapper'>
					{MiniAcordeonsData.map((data, index) => (
						<MiniAcordeon key={index} heading={data.heading} content={data.content} />
					))}
				</div>
			</div>
		)
	}

	const SignInComponent: FC = () => {
		return (
			<div className='support-content__content'>
				<div className='support-content__title'>{w('support-heading-2')}</div>
				<div className='support-content__drops-wrapper'>
					{MiniAcordeonsData.map((data, index) => (
						<MiniAcordeon key={index} heading={data.heading} content={data.content} />
					))}
				</div>
			</div>
		)
	}

	const DeliveryComponent: FC = () => {
		return (
			<div className='support-content__content'>
				<div className='support-content__title'>{w('support-heading-3')}</div>
				<div className='support-content__drops-wrapper'>
					{MiniAcordeonsData.map((data, index) => (
						<MiniAcordeon key={index} heading={data.heading} content={data.content} />
					))}
				</div>
			</div>
		)
	}

	const PaymentComponent: FC = () => {
		return (
			<div className='support-content__content'>
				<div className='support-content__title'>{w('support-heading-4')}</div>
				<div className='support-content__drops-wrapper'>
					{MiniAcordeonsData.map((data, index) => (
						<MiniAcordeon key={index} heading={data.heading} content={data.content} />
					))}
				</div>
			</div>
		)
	}

	const componentMap: { [key: string]: JSX.Element } = {
		Component1: <RegistrationComponent />,
		Component2: <SignInComponent />,
		Component3: <DeliveryComponent />,
		Component4: <PaymentComponent />
	}

	const selectedComponent = componentMap[selectedValue] || null
	return (
		<div className='support-content'>
			<div className='support-content__title'></div>
			{selectedComponent}
		</div>
	)
}

export default SupportContent
