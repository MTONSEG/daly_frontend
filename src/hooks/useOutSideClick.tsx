import { useState, useEffect, useRef } from 'react'



const useOutsideClick = <T extends HTMLElement>(initValue: boolean) => {
	const [isActive, setIsActive] = useState(initValue)
	const ref = useRef<T | null>(null)

	const handleClick = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setIsActive(!isActive)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		}
	})

	return { ref, isActive, setIsActive }
}

export default useOutsideClick
