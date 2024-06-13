// import { useEffect } from 'react';

// interface PropsType {
//   className: string;
// }

// const useHidePopupsOnReload = ({ className }: PropsType) => {
//   console.log(`Class Name: ${className}`); // Проверка передачи класса

//   useEffect(() => {
//         const handleHidePopups = () => {
//         console.log(`Attempting to hide popups with class: ${className}`);
//         const popup = document.querySelector(`.${className}`);
//         console.log(`Popup found:`, popup);
//         if (popup) {
//           popup.classList.add('hidden');
//           console.log(`Popup class list after hiding: ${popup.className}`);
//         } else {
//           console.log('Popup not found');
//         }
//       };
//       window.addEventListener('beforeunload', handleHidePopups);
//       window.addEventListener('popstate', handleHidePopups);

//       return () => {
//         window.removeEventListener('beforeunload', handleHidePopups);
//         window.removeEventListener('popstate', handleHidePopups);
//       };
//   }, [className]);
// };

// export default useHidePopupsOnReload;

