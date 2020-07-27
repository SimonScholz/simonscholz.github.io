import dotenv from 'dotenv'
import { GatsbyConfig } from 'gatsby'

dotenv.config()

const gatsbyConfig: GatsbyConfig = {
	siteMetadata: {
		siteUrl: 'https://simonscholz.github.io/',
		title: 'Simon Scholz',
		description: 'Website for Simons programming tutorials',
		trackingId: 'UA-170566702-1',
	},
	plugins: [
		{
			resolve: `gatsby-plugin-gdpr-cookies`,
			options: {
				googleAnalytics: {
					trackingId: 'UA-170566702-1', // leave empty if you want to disable the tracker
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
		'gatsby-plugin-typescript',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-postcss',
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
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
				name: `blog`,
				path: `${__dirname}/../../content/blog/`,
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
				color: 'rebeccapurple',
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
		'gatsby-plugin-webpack-size',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-netlify',
		`gatsby-plugin-sharp`,
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
