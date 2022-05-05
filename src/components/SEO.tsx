/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import { ReactElement } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface SeoProps {
	description?: string
	lang?: string
	keywords?: string[]
	title: string
}

export const SEO = ({
	description,
	lang,
	keywords,
	title,
}: SeoProps): ReactElement => {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						image
						url
						keywords
					}
				}
			}
		`,
	)

	const metaDescription = description || site.siteMetadata.description
	const metaKeywords = keywords || site.siteMetadata.keywords
	const defaultTitle = site.siteMetadata?.title
	const metaImage = site.siteMetadata?.image
	const metaUrl = site.siteMetadata?.url

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : ''}
			meta={[
				{
					name: 'google-site-verification',
					content: 'YFhcQWdXNj4uTSqpC_Qqul3JoEEVNaOqIr0KDPjOrG4',
				},
				{
					name: 'description',
					content: metaDescription,
				},
				{
					property: 'og:title',
					content: title,
				},
				{
					property: 'og:description',
					content: metaDescription,
				},
				{
					property: 'og:type',
					content: 'website',
				},
				{
					property: 'og:image',
					content: metaImage,
				},
				{
					property: 'og:url',
					content: metaUrl,
				},
				{
					name: 'twitter:card',
					content: 'summary',
				},
				{
					name: 'twitter:creator',
					content: site.siteMetadata?.twitterUsername || '',
				},
				{
					name: 'twitter:title',
					content: title,
				},
				{
					name: 'twitter:description',
					content: metaDescription,
				},
				{
					name: 'twitter:image',
					content: metaImage,
				},
				{
					name: 'referrer',
					content: 'no-referrer-when-downgrade',
				},
			].concat(
				metaKeywords && metaKeywords.length > 0
					? {
							name: 'keywords',
							content: metaKeywords.join(', '),
					  }
					: [],
			)}
		/>
	)
}

SEO.defaultProps = {
	lang: 'en',
	meta: [],
	description: '',
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
}
