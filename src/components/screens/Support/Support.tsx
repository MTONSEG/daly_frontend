'use client'
import React, { FC, useState } from 'react'
import SupportNav from './SupportNav/SupportNav'
import SupportContent from './SupportContent/SupportContent'
import './Support.scss'
import Container from '@/components/ui/containers/Container/Container'

interface ISupport {}

const themes = [
	{
		name: 'registration',
		values: ['Component1', 'Component2']
	},
	{
		name: 'delivery',
		values: ['Component3', 'Component4']
	}
]

const Support: FC<ISupport> = ({}) => {
	const [selectedValue, setSelectedValue] = useState<string>(themes[0].values[0])

	const handleSelectValue = (value: string) => {
		setSelectedValue(value)
	}

	return (
		<Container>
			<div className='support'>
				<SupportNav themes={themes} onSelectValue={(value: string) => handleSelectValue(value)} />
				<SupportContent selectedValue={selectedValue} />
			</div>
		</Container>
	)
}

export default Support
