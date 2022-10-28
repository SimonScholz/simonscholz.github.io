import dotenv from 'dotenv'
import { GatsbyConfig } from 'gatsby'

dotenv.config()

const gatsbyConfig: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'https://simonscholz.github.io',
		url: 'https://simonscholz.github.io',
		title: 'Simon`s Programming Tutorials',
		description:
			'Programming tutorials for many different technologies, e.g., Kotlin, Java, TypeScript, Unix, Spring, Quarkus, Eclipse RCP, Docker, Kubernetes, Monitoring, Prometheus, Grafana',
		author: 'Simon Scholz',
		keywords: [
			'Kotlin',
			'Java',
			'TypeScript',
			'Unix',
			'Spring Boot',
			'Quarkus',
			'Eclipse RCP',
			'Docker',
			'Kubernetes',
			'Monitoring',
			'Prometheus',
			'Grafana',
		],
		image: 'src/assets/img/real-avatar.png',
		twitterUsername: '@simonscholz',
		trackingId: 'UA-170566702-1',
	},
	plugins: [
		{
			resolve: `gatsby-plugin-gdpr-cookies`,
			options: {
				googleAnalytics: {
					trackingId: 'UA-178729457-1', // leave empty if you want to disable the tracker
					cookieName: 'gatsby-gdpr-google-analytics', // default
					anonymize: true, // default
				},
				googleTagManager: {
					trackingId: '', // leave empty if you want to disable the tracker
					cookieName: 'gatsby-gdpr-google-tagmanager', // default
					dataLayerName: 'dataLayer', // default
				},
				facebookPixel: {
					pixelId: '', // leave empty if you want to disable the tracker
					cookieName: 'gatsby-gdpr-facebook-pixel', // default
				},
				// defines the environments where the tracking should be available  - default is ["production"]
				environments: ['production', 'development'],
			},
		},
		'gatsby-plugin-robots-txt',
		'gatsby-plugin-typescript',
		`gatsby-plugin-image`,
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				tableOfContents: {
					heading: null,
					maxDepth: 6,
				},
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 768,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-autolink-headers`,
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: `assets`,
				path: `${__dirname}/../assets/`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: `tutorials`,
				path: `${__dirname}/../../content/tutorials/`,
			},
		},
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('../components/layout/Layout.tsx'),
			},
		},
		{
			resolve: 'gatsby-plugin-nprogress',
			options: {
				color: '#A0A0A0',
				showSpinner: false,
				trickle: true,
				minimum: 0.08,
			},
		},
		{
			resolve: 'gatsby-plugin-purgecss',
			options: {
				tailwind: true,
			},
		},
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: 'https://simonscholz.github.io/',
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				output: "/",
			},
		},
		'gatsby-plugin-netlify',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Simon´s Programming Tutorials`,
				short_name: `Simon´s Programming Tutorials`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#A0A0A0`,
				display: `minimal-ui`,
				icon: `src/assets/img/avatar.png`,
			},
		},
		`gatsby-plugin-offline`,
	],
}

module.exports = gatsbyConfig
