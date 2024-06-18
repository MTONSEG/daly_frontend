import { FC } from 'react'
import './AsyncSelect.scss'
import dynamic from 'next/dynamic'
import { ISelectOption } from '@/types/types'

import { OptionsType, ActionMeta } from 'react-select'

const Select = dynamic(() => import('react-select/async'), { ssr: false })

interface PropsType {
	loadOptions: (value: string) => Promise<ISelectOption[]>
	options: OptionsType<ISelectOption>
	onChange: (value: ISelectOption[] | null, actionMeta: ActionMeta<ISelectOption>) => void
}

const AsyncSelect: FC<PropsType> = ({ ...props }) => {
	return (
		<Select loadOptions={props.loadOptions} options={props.options} onChange={props.onChange} />
	)
}

export default AsyncSelect
