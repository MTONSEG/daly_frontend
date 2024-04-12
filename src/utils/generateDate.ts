export const generateDate = (numberOfDaysToAdd: number) => {
	const currentDate = new Date()

	const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

	if (currentDate.getDate() + numberOfDaysToAdd > daysInMonth(2024, currentDate.getMonth() + 1)) {
		const difference =
			currentDate.getDate() + numberOfDaysToAdd - daysInMonth(2024, currentDate.getMonth() + 1)
		currentDate.setMonth(currentDate.getMonth() + 1)
		currentDate.setDate(1 + difference)

		return new Date(
			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() - 1}`
		).toLocaleString('default', {
			day: 'numeric',
			month: 'long'
		})
	} else {
		return new Date(
			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
				currentDate.getDate() + numberOfDaysToAdd
			}`
		).toLocaleString('default', {
			day: 'numeric',
			month: 'long'
		})
	}
}
