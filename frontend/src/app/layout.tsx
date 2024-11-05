import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'

import './globals.css'
import { cn } from '@/lib/utils'
import { ReactQueryProvider } from '@/Provider/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'FalaDev',
	description: 'Mentoria para desenvolvedores',
	icons: [{ url: '/static/imgs/faladev.ico' }],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={cn(inter.className, 'flex flex-col items-center justify-center min-h-screen')}>
				<ReactQueryProvider>
					<header className="flex justify-center items-center space-x-4 w-full text-center pb-6">
						<Image src="/static/imgs/faladev.jpg" alt="FalaDev Logo" height="50" width="200" />
					</header>
					{children}
					<footer className="flex flex-wrap justify-center items-center space-x-4 w-full text-center py-4">
						<a
							href="https://www.instagram.com/faladev.tech/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-2 transition-transform transform hover:scale-105"
						>
							<Image src="/static/imgs/instagram.svg" alt="Instagram FalaDev" width={25} height={25} />
							<span className="text-base text-gray-700 hover:text-blue-600">@faladev.tech</span>
						</a>
						<a
							href="https://www.youtube.com/@FalaDev"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-2 transition-transform transform hover:scale-105"
						>
							<Image src="/static/imgs/youtube.svg" alt="YouTube FalaDev" width={35} height={35} />
							<span className="text-base text-gray-700 hover:text-red-600">@FalaDev</span>
						</a>
						<a
							href="https://chat.whatsapp.com/BZpPgPOH9F091JLiIvRMpd"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-2 transition-transform transform hover:scale-105"
						>
							<Image src="/static/imgs/whatsapp.svg" alt="WhatsApp FalaDev" width={30} height={30} />
							<span className="text-base text-gray-700 hover:text-green-600">@FalaDev</span>
						</a>
					</footer>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
