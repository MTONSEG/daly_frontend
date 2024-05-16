// export const generateDate = (numberOfDaysToAdd: number) => {
// 	const currentDate = new Date()

// 	const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate()

// 	if (currentDate.getDate() + numberOfDaysToAdd > daysInMonth(2024, currentDate.getMonth() + 1)) {
// 		const difference =
// 			currentDate.getDate() + numberOfDaysToAdd - daysInMonth(2024, currentDate.getMonth() + 1)
// 		currentDate.setMonth(currentDate.getMonth() + 1)
// 		currentDate.setDate(1 + difference)

// 		return new Date(
// 			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() - 1}`
// 		).toLocaleString('default', {
// 			day: 'numeric',
// 			month: 'long'
// 		})
// 	} else {
// 		return new Date(
// 			`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${
// 				currentDate.getDate() + numberOfDaysToAdd
// 			}`
// 		).toLocaleString('default', {
// 			day: 'numeric',
// 			month: 'long'
// 		})
// 	}
// }


export const generateDate = (numberOfDaysToAdd: number) => {
	const currentDate = new Date()
	currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd)
  
	const year = currentDate.getFullYear()
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
	const day = currentDate.getDate().toString().padStart(2, '0')
  
	return `${year}-${month}-${day}`
  }
  
