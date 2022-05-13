import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { SEO } from '../components/SEO'
import { BlogpageQuery } from '../types/graphql'
import { SearchBox } from '../components/SearchBox'
import { TutorialCard } from '../components/cards/TutorialCard'
import { Tag } from '../components/tag'

export const query = graphql`
	query BlogAndAvatarQuery {
		file(relativePath: { eq: "img/avatar.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
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
						tags
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
	const allPosts = data.allMarkdownRemark.edges

	const emptyQuery = ''

	const [state, setState] = useState({
		filteredData: [],
		query: emptyQuery,
	})

	const setQuery = (query: string) => {
		const posts = data.allMarkdownRemark.edges || []

		const filteredData = posts.filter((post: any) => {
			const { description, title, tags } = post.node.frontmatter

			return (
				description.toLowerCase().includes(query.toLowerCase()) ||
				title.toLowerCase().includes(query.toLowerCase()) ||
				(tags && tags.join('').toLowerCase().includes(query.toLowerCase()))
			)
		})

		setState({
			query,
			filteredData,
		})
	}

	const { filteredData, query } = state

	const hasSearchResults = filteredData && query !== emptyQuery

	const posts = hasSearchResults ? filteredData : allPosts

	return (
		<>
			<SEO title="Tutorials" />
			<SearchBox setQuery={setQuery} resultSize={posts.length} />
			{/*
				<div className="flex content-start flex-wrap mt-2 mx-2">
					{allPosts.map((edge: any) => {
						return edge.node.frontmatter.tags.map((tag: string) => {
							return (
								<Tag
									tagName={tag}
									classNameAdditions="hover:bg-blue-500 cursor-pointer"
								/>
							)
						})
					})}
				</div>
			*/}
			{posts.map((edge: any) => {
				return (
					<TutorialCard
						path={edge.node.frontmatter.path}
						id={edge.node.id}
						title={edge.node.frontmatter.title}
						timeToRead={edge.node.timeToRead}
						description={edge.node.frontmatter.description}
						gatsbyImageData={data!.file!.childImageSharp!.gatsbyImageData}
						author={edge.node.frontmatter.author}
						date={edge.node.frontmatter.date}
						tags={edge.node.frontmatter.tags}
					/>
				)
			})}
		</>
	)
}

export default Tutorials
