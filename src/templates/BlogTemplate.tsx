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
	const { frontmatter, html, timeToRead, tableOfContents } = markdownRemark
	const issueLink = `https://github.com/SimonScholz/simonscholz.github.io/issues/new?labels=website,tutorial&title=[${frontmatter.id}]`
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
					<p className="text-gray-600 text-sm border-b-2 mb-2 flex flex-col md:flex-row">
						<p className="grow md:grow-0">
							{frontmatter.author} ⚬ <time>{frontmatter.date}</time> ⚬{' '}
							{timeToRead} min read
						</p>
						<a className="md:ml-3 mb-2 md:mb-0" href={issueLink}>
							<img
								src="https://img.shields.io/badge/-Feedback%3F%20Requests%3F-informational?logo=github"
								alt="Feedback / Requests?"
							/>
						</a>
					</p>
					<img
						src={`https://${frontmatter.vgWort}`}
						width="1"
						height="1"
						alt=""
					></img>
					<a className="fixed bottom-8 right-5 z-40 w-300" href={issueLink}>
						<img
							src="https://img.shields.io/badge/-Feedback%3F%20Requests%3F-informational?logo=github"
							alt="Feedback / Requests?"
						/>
					</a>
					<div
						className="blog-post-toc"
						dangerouslySetInnerHTML={{ __html: tableOfContents }}
					/>
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
			tableOfContents(
				absolute: false
				pathToSlugField: "frontmatter.path"
				maxDepth: 2
			)
			frontmatter {
				id
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
