import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'
import { SEO } from '../components/SEO'
import { BlogpageQuery } from '../types/graphql'
import { GatsbyImage } from "gatsby-plugin-image";
import { SearchBox } from '../components/SearchBox'

export const query = graphql`query BlogAndAvatarQuery {
  file(relativePath: {eq: "img/avatar.png"}) {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH)
    }
  }
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
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
				(tags &&
					tags
						.join('')
						.toLowerCase()
						.includes(query.toLowerCase()))
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

	return <>
        <SEO title="Tutorials" metaDescription="Programming Tutorials" />
        <SearchBox setQuery={setQuery} resultSize={posts.length} />
        {/*
        <div className="flex content-start flex-wrap mt-2 mx-2">
            {allPosts.map((edge: any) => {
                return edge.node.frontmatter.tags.map((tag: string) => {
                    return (
                        <button
                            key={tag}
                            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 m-1 rounded"
                        >
                            {tag.trim()}
                        </button>
                    )
                })
            })}
        </div>
        */}
        {posts.map((edge: any) => {
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
                                <GatsbyImage
                                    image={data!.file!.childImageSharp!.gatsbyImageData}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full mr-4" />
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
            );
        })}
    </>;
}

export default Tutorials
