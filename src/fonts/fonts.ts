import { Roboto, Open_Sans, Poppins, Nunito } from 'next/font/google'

export const roboto = Roboto({
	weight: ['400', '500'],
	subsets: ['cyrillic', 'latin'],
	variable: '--roboto',
	display: 'swap'
})

export const open_sans = Open_Sans({
	weight: ['400', '600'],
	subsets: ['cyrillic', 'latin'],
	variable: '--inter',
	display: 'swap'
})

export const poppins = Poppins({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--poppins',
	display: 'swap'
})

export const nunito = Nunito({
	weight: ['500', '700'],
	subsets: ['latin', 'cyrillic'],
	variable: '--nunito',
	display: 'swap'
})
