import React, { useEffect, useState } from 'react'
import './GridHeadModder.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setGridMode } from '@/store/catalog/slice/catalog.slice'
import { CardsModIcon } from '@/components/ui/icons'
import { ListModIcon } from '@/components/ui/icons'
type gridMode = 'card' | 'row'
const GridHeadModder = () => {
	const dispatch = useAppDispatch()
	const [gridType, setGridType] = useState<gridMode>('card')
	
	const handleModeClick = (id: number) => {
		if (id === 1) {
			setGridType('card')
		} else {
			setGridType('row')
		}
	}

	useEffect(() => {
		dispatch(setGridMode({mode: gridType}))
	}, [gridType, dispatch]);

	return <div className='modder'>
		<CardsModIcon className={`modder__icon ${gridType === "card" && "active"} `} onClick={()=>{handleModeClick(1)}}/>
		<ListModIcon className={`modder__icon ${gridType === "row" && "active"} `} onClick={()=>{handleModeClick(2)}}/>
	</div>
}

export default GridHeadModder
