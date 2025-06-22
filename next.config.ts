import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: ['localhost', '93.127.186.161'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				hostname: '93.127.186.161',
				port: '3000',
				pathname: '/uploads/**',
			},
			{
				hostname: '93.127.186.161',
				port: '1337',
				pathname: '/uploads/**',
			},
			{
				hostname: 'localhost',
				port: '1337',
				pathname: '/uploads/**',
			},
			{
				hostname: '93.127.186.161',
				port: '3000',
				pathname: '/_next/**',
			},
		],
	},
}

export default nextConfig
