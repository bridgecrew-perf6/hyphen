/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	redirects: [
		{
			source: "/api/v1/artifacts/:path*",
			destination: "/api/v1/artefacts/:path*",
			permanent: false,
		},
	],

	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Server",
						value: "Hyphen",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
