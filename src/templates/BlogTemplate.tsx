import React from 'react'
import { SEO } from '../components/SEO'
import { graphql } from 'gatsby'

interface Props {
	data: {
		markdownRemark: any
	}
}

export default function BlogTemplate({
	data, // this prop will be injected by the GraphQL query below.
}: Props) {
	const { markdownRemark } = data // data.markdownRemark holds your post data
	const { frontmatter, html, timeToRead } = markdownRemark
	return (
		<>
			<SEO
				title={frontmatter.title}
				description={frontmatter.description}
				keywords={frontmatter.tags}
			/>
			<article className="blog-post-container mt-2 mx-3">
				<div className="blog-post">
					<h1 className="text-gray-900 text-3xl">{frontmatter.title}</h1>
					<p className="text-gray-600 text-sm border-b-2 mb-2">
						{frontmatter.author} ⚬ <time>{frontmatter.date}</time> ⚬{' '}
						{timeToRead} min read
					</p>
					<img
						src={`https://${frontmatter.vgWort}`}
						width="1"
						height="1"
						alt=""
					></img>
					<div
						className="blog-post-content markdown"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				</div>
			</article>
		</>
	)
}

export const pageQuery = graphql`
	query ($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			timeToRead
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				author
				tags
				vgWort
			}
		}
	}
`
