import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		ignoreDuringBuilds: true, // Zignoruj ESLint podczas procesu budowy
	},
	typescript: {
		ignoreBuildErrors: true, // Pomiń błędy typów podczas procesu build
	},
	images: {
		domains: ['localhost', '69.62.113.55'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
			},
			{
				hostname: '69.62.113.55',
				port: '3000', // Jeśli używasz Strapi na porcie 1337
				pathname: '/uploads/**',
			},
			{
				hostname: '69.62.113.55',
				port: '1337', // Jeśli używasz Strapi na porcie 1337
				pathname: '/uploads/**',
			},
			{
				hostname: 'localhost',
				port: '1337', // Jeśli używasz Strapi na porcie 1337
				pathname: '/uploads/**',
			},
			{
				hostname: '69.62.113.55',
				port: '3000', // Jeśli używasz Strapi na porcie 1337
				pathname: '/_next/**',
			},
		],
	},
}

export default nextConfig
