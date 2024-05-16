import { useState, useLayoutEffect } from "react";


const queries = [
    "(max-width: 767px)",
    "(min-width: 768px) and (max-width: 1024px)",
    "(min-width: 1025px)"
]

export const useMatchMedia = () => {
   const mediaQueryLists = queries.map(query => matchMedia(query))

   const getValues = () => mediaQueryLists.map(mql => mql.matches)

   const [values, setValues] = useState(getValues)

   useLayoutEffect(() => {
    const handler = () => setValues(getValues)

    mediaQueryLists.forEach(mql => mql.addEventListener("change",handler))

    return () => mediaQueryLists.forEach(mql => mql.removeEventListener("change",handler))

   })
   const setIsMobile = (value: any) => {
    setValues([value, values[1], values[2]]);
  };

return {
    isMobile: values[0],
    isTablet: values[1],
    isDesktop: values[2],
    setIsMobile
  };
}