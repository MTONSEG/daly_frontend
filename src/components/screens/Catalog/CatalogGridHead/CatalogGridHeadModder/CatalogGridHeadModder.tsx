import React, { useState } from 'react'
import './CatalogGridHeadSorter.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setGridMode } from '@/store/catalog/slice/catalog.slice'
import { CardsModIcon } from '@/components/ui/icons'
import { ListModIcon } from '@/components/ui/icons'
type gridMode = 'card' | 'row'
const CatalogGridHeadModder = () => {
	const dispatch = useAppDispatch()
	const [gridType, setGridType] = useState<gridMode>('card')

	const handleModeClick = (id: number) => {
		if (id === 1) {
			setGridType('card')
		} else {
			setGridType('row')
		}

		dispatch(setGridMode({ mode: gridType }))
	}

	return <div className='modder'>
		<CardsModIcon className={`modder__icon ${gridType === "card" && "active"} `} onClick={()=>{handleModeClick(2)}}/>
		<ListModIcon className={`modder__icon ${gridType === "row" && "active"} `} onClick={()=>{handleModeClick(1)}}/>
	</div>
}

export default CatalogGridHeadModder
