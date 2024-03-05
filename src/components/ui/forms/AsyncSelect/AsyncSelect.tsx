import { FC } from 'react'
import './AsyncSelect.scss'
import dynamic from 'next/dynamic'
import { ISelectOption } from '@/types/types'
import { GroupBase } from 'react-select'
import { AsyncProps } from 'react-select/async'
const Select = dynamic(() => import('react-select/async'), { ssr: false })

interface PropsType{
	options: ISelectOption[]
}

const AsyncSelect: FC<PropsType> = ({ ...props }) => {
	return (
		<Select options={props.options} onChange={}/>
	)
}

export default AsyncSelect
