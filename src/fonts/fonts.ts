import { Roboto, Open_Sans, Inter, Nunito } from 'next/font/google'

export const roboto = Roboto({
	weight: ['400', '500'],
	subsets: ['cyrillic', 'latin'],
	variable: '--roboto',
	display: 'swap'
})

export const open_sans = Open_Sans({
	weight: ['300', '400', '600'],
	subsets: ['cyrillic', 'latin'],
	variable: '--inter',
	display: 'swap'
})


export const inter = Inter({
	weight: ['400', '500', '600', '700','800'],
	subsets: ['latin', 'cyrillic'],
	variable: '--inter',
	display: 'swap'
})

export const nunito = Nunito({
	weight: ['500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
	variable: '--nunito',
	display: 'swap'
})