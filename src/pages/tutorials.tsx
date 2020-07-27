import { graphql, Link } from 'gatsby'
import React from 'react'
import { SEO } from '../components/SEO'
import { BlogpageQuery } from '../types/graphql'
import Img from 'gatsby-image'

export const query = graphql`
	query BlogAndAvatarQuery {
		file(relativePath: { eq: "img/avatar.png" }) {
			childImageSharp {
				# Specify the image processing specifications right in the query.
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					id
					timeToRead
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
						author
						path
					}
				}
			}
		}
	}
`

type Props = {
	data: BlogpageQuery
}

const Tutorials = ({ data }: Props): React.ReactElement => {
	return (
		<>
			<SEO title="Tutorials" metaDescription="Programming Blog" />

			{data.allMarkdownRemark.edges.map((edge: any) => {
				return (
					<Link to={edge.node.frontmatter.path} key={edge.node.id}>
						<div className="mt-3 mx-3 cursor-pointer">
							<div className="border border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal hover:shadow-lg">
								<div className="mb-8">
									<div className="text-gray-900 font-bold text-xl">
										{edge.node.frontmatter.title}
									</div>
									<p className="text-gray-600 mb-2">
										{edge.node.timeToRead} min read
									</p>
									<p className="text-gray-700 text-base">
										{edge.node.frontmatter.description}
									</p>
								</div>
								<div className="flex items-center">
									<Img
										fluid={data!.file!.childImageSharp!.fluid}
										alt="Avatar"
										className="w-10 h-10 rounded-full mr-4"
									/>
									<div className="text-sm">
										<p className="text-gray-900 leading-none">
											{edge.node.frontmatter.author}
										</p>
										<p className="text-gray-600">
											{edge.node.frontmatter.date}
										</p>
									</div>
								</div>
							</div>
						</div>
					</Link>
				)
			})}
		</>
	)
}

export default Tutorials
