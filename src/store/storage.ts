import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

const createNoopStorage = <T> () => {
	return {
		getItem() {
			return Promise.resolve(null)
		},
		setItem(_key: number, value: T) {
			return Promise.resolve(value)
		},
		removeItem() {
			return Promise.resolve()
		}
	}
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export default storage
