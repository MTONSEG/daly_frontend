export const checkArr = <T>(data: T[] | T): T => (Array.isArray(data) ? data[0] : data)
