import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { IconLeftBorder } from './IconLeftBorder'

export function TrainingsCertificates(): React.ReactElement {
	const { medal } = useStaticQuery(
		graphql`
			query TrainingsCertificatesQuery {
				medal: file(relativePath: { eq: "img/crown.png" }) {
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
			}
		`,
	)

	return (
		<>
			<IconLeftBorder fluid={medal.childImageSharp.fluid} title="Trainings">
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">
						Trainer for trainings of the vogella GmbH
					</h2>
					<ul className="list-disc list-inside ml-3">
						<li>Spring Boot &amp; Dojo IO</li>
						<li>Spring &amp; React JS</li>
						<li>Spring Webflux mit MongoDB und Project Reactor</li>
						<li>Groovy &amp; Gradle &amp; Testing</li>
						<li>Apache Maven and Testing</li>
						<li>Eclipse RCP</li>
						<li>Eclipse IDE Extensions Android Development</li>
						<li>and more...</li>
					</ul>
				</div>
			</IconLeftBorder>
		</>
	)
}
