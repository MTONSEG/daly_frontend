import { useMemo } from 'react'
import { useAppDispatch } from './useReduxHooks'
import { bindActionCreators } from '@reduxjs/toolkit'


interface RootActions {}

const rootActions: RootActions = {}

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
