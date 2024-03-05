import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{ loader: '@svgr/webpack', options: { icon: true } }]
		})

		return config
	},

	images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [375, 640, 750, 828, 1080, 1280, 1920],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com', // Add this line
                port: ''
			},
			{
				protocol: 'https',
				hostname: 'cdn.dummyjson.com',
				port: ''
            }
        ]
    }
}

export default withNextIntl(nextConfig)