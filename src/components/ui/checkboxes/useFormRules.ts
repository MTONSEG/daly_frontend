import * as yup from 'yup'

const checkboxValid = yup
	.mixed()
	.oneOf([true], 'Необходимо согласие на обработку перснальных данных')

export const schemaCheckbox = yup.object({
	subscribe: checkboxValid
})
