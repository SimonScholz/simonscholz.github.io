import React from 'react'
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
		<div className="blog-post-container mt-2 mx-3">
			<div className="blog-post">
				<h1 className="text-gray-900 text-3xl">{frontmatter.title}</h1>
				<p className="text-gray-600 text-sm border-b-2">
					{frontmatter.author} ⚬ {frontmatter.date} ⚬ {timeToRead} min read
				</p>
				<div
					className="blog-post-content markdown"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</div>
	)
}

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			timeToRead
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				author
			}
		}
	}
`
