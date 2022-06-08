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
				<div className="flex flex-col mt-3" id="special-skills">
					<h2 className="font-semibold">Programming / Expressive Languages</h2>
					<span>
						Kotlin, Java, Groovy, JavaScript/TypeScript, C#, SQL, XSLT, CSS,
						HTML 5, AsciiDoc, Markdown
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Technologies / Frameworks</h2>
					<span>
						Spring (Spring Boot 2 incl. Webflux and Spring Cloud), Quarkus IO,
						Micrometer Metrics, Android, Dojo IO, React JS, Gatsby, NextJS,
						Eclipse RCP (Rich Client Platform), JPA/Hibernate/EclipseLink, Junit
						5, AssertJ, Mockito, Mockk, Hamcrest, Spock, RxJava/Project Reactor
						IO/Mutiny, Terraform, GitOps/Flux, Ansible, Inbluxdb, Stackdriver,
						Prometheus, Grafana, Swagger, OpenAPI Generator, GCP (Google Cloud
						Platform)
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Analysis and Performance Tools</h2>
					<span>
						Sonarqube, Spotbugs, Checkstyle, Jacoco, detekt, ktlint, Gatling
						Yourkit, JMeter
					</span>
				</div>
				<div className="flex flex-col mt-3">
					<h2 className="font-semibold">Tools</h2>
					<span>
						Eclipse, IntelliJ, VS Code, Git, Gerrit, Gradle, Maven, NPM, Ant
						Spring CLI, DOJO CLI, Jenkins, Travis CI, Circle CI, GitHub Actions,
						Postman/Newman
					</span>
				</div>
			</IconLeftBorder>
		</>
	)
}
