import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { IconLeftBorder } from './IconLeftBorder'

export function SpecialKnowledge(): React.ReactElement {
	const { medal } = useStaticQuery(
		graphql`
			query SpecialKnowledgeQuery {
				medal: file(relativePath: { eq: "img/medal.png" }) {
					childImageSharp {
						gatsbyImageData(layout: FULL_WIDTH)
					}
				}
			}
		`,
	)

	return (
		<>
			<IconLeftBorder
				fluid={medal.childImageSharp.gatsbyImageData}
				title="Special Skills"
			>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Programming / Expressive Languages</h2>
					<span>
						Java, Groovy, Kotlin, JavaScript/TypeScript, C#, SQL, XSLT, CSS,
						HTML 5, AsciiDoc, Markdown
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Technologies / Frameworks</h2>
					<span>
						Spring (Spring Boot 2 incl. Webflux), Micrometer Metrics, Android,
						Dojo IO, React JS, Eclipse RCP, JPA/Hibernate/EclipseLink, Junit,
						AssertJ, Mockito, Hamcrest, Spock, RxJava/Project Reactor IO,
						Terraform, Ansible, Inbluxdb, Prometheus, Grafana, Swagger, OpenAPI
						Generator
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Analysis Tools</h2>
					<span>
						Sonarqube, Spotbugs, Checkstyle, Jacoco, detekt, ktlint, Yourkit,
						JMeter
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Tools</h2>
					<span>
						Eclipse, IntelliJ, VS Code, Git, Gerrit, Gradle, Maven, NPM, Ant
						Spring CLI, DOJO CLI, Jenkins, Travis CI, Circle CI
					</span>
				</div>
			</IconLeftBorder>
		</>
	)
}
