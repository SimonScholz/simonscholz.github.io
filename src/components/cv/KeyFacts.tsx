import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { IconLeftBorder } from './IconLeftBorder'

export function KeyFacts(): React.ReactElement {
	const { key } = useStaticQuery(
		graphql`
			query KeyFactsQuery {
				key: file(relativePath: { eq: "img/key.png" }) {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
				site {
					siteMetadata {
						title
					}
				}
			}
		`,
	)

	return (
		<>
			<IconLeftBorder
				fluid={key.childImageSharp.gatsbyImageData}
				title="Key Facts"
			>
				<div className="flex flex-row mt-3">
					<div className="grow">
						<ul className="list-disc list-inside ml-3 p-2">
							<li>Speaker at conferences</li>
							<li>Working worldwide</li>
							<li>Lead Software Engineer</li>
							<li>Explorer of new technologies</li>
						</ul>
					</div>
					<div className="grow">
						<ul className="list-disc list-inside ml-3 p-2">
							<li>Mentoring of students and colleagues</li>
							<li>Open Source addicted</li>
							<ul className="list-disc list-inside ml-3">
								<li>Contributed to several open source projects</li>
								<li>Committer of the month for the Eclipse Platform</li>
							</ul>
						</ul>
					</div>
				</div>
			</IconLeftBorder>
		</>
	)
}
