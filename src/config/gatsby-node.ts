import { GatsbyNode } from 'gatsby'
import path from 'path'

const gatsbyNode: GatsbyNode = {
	createPages: async ({ graphql, actions, reporter }) => {
		const { createPage } = actions
		const blogPostTemplate = path.resolve(`src/templates/BlogTemplate.tsx`)

		const result = await graphql(`
			{
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					limit: 1000
				) {
					edges {
						node {
							frontmatter {
								path
							}
						}
					}
				}
			}
		`)

		// Handle errors
		if (result.errors) {
			reporter.panicOnBuild(`Error while running GraphQL query.`)
			return
		}

		const data: any = result.data as any

		if (typeof result.data === 'object') {
			data.allMarkdownRemark.edges.forEach((edge: any) => {
				createPage({
					path: edge.node.frontmatter.path,
					component: blogPostTemplate,
					context: {}, // additional data can be passed via context
				})
			})
		}
	},
}

module.exports = gatsbyNode
