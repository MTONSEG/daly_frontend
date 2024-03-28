'use client'

import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'

export function ReduxProvider({ children }: { children: ReactNode }) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	)
}
