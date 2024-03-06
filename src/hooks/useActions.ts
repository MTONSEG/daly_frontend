import { useMemo } from 'react'
import { useAppDispatch } from './useReduxHooks'
import { bindActionCreators } from '@reduxjs/toolkit'
import { headerActions, HeaderActions } from '@/store/header/header.slice'

interface RootActions {
	header: HeaderActions
}

const rootActions: RootActions = {
	header: headerActions
}

export const useActions = <T extends keyof RootActions>(
	reducerName: T
): RootActions[T] => {
	const dispatch = useAppDispatch()
	const actions = useMemo(
		() => bindActionCreators(rootActions[reducerName], dispatch),
		[dispatch, reducerName]
	)

	return actions
}
