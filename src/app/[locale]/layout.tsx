import type { Metadata } from 'next'
import '@/styles/global.scss'
import { inter } from '@/fonts/fonts'
import Header from '@/components/widgets/layout/Header/Header'
import Footer from '@/components/widgets/layout/Footer/Footer'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { ReduxProvider } from '@/components/providers/ReduxProvider'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

interface RootLayoutProps {
	children: React.ReactNode
	params: { local: string }
}

export default function RootLayout({ children, params: { local } }: Readonly<RootLayoutProps>) {
	const messages = useMessages()

	return (
		<html lang={local}>
			<body className={inter.variable}>
				<NextIntlClientProvider messages={messages}>
					<ReduxProvider>
						<div className='wrapper'>
							{/* <Header /> */}
							<main className='main'>{children}</main>
							<Footer />
						</div>
					</ReduxProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
