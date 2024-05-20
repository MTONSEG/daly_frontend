'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { FavoriteIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/popups/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/popups/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/popups/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { COMPARE_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks'
import { useEffect } from 'react'
import { fetchFavoritesData } from '@/store/api/favorites.api'

export default function FavoritePopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const t = useTranslations('home')

	const handleToggle = () => {
		setIsActive((active) => !active)
	}
	const favId = useAppSelector((state) => state.favourites.products)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchFavoritesData(favId))
	}, [])

	const favData = useAppSelector((state) => state.favoritesApi.favorites)
	console.log(favData)
	return (
		<PopupHeader variant='favorite'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<FavoriteIcon />
			</Button>
			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${COMPARE_PATH}`}
				labelLink='В избранное'
				isEmpty
				textEmpty={t('empty-favorite')}
			>
				{favData &&
					favData.map((item, index) => (
						<PopupHeaderItem
							title={item.attributes.title}
							price={70000}
							imageSrc=''
							onClick={handleToggle}
							key={index}
						/>
					))}
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
