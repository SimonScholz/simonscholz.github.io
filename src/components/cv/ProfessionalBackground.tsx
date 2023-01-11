import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { FlexInitialXlBlock } from './FlexInitialXlBlock'
import { IconLeftBorder } from './IconLeftBorder'
import { XlHiddenTimeFrame } from './XlHiddenTimeFrame'

export function ProfessionalBackground(): React.ReactElement {
	const { gears } = useStaticQuery(
		graphql`
			query ProfessionalBackgroundQuery {
				gears: file(relativePath: { eq: "img/gears.png" }) {
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
				fluid={gears.childImageSharp.gatsbyImageData}
				title="Professional Background"
			>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Since Nov 2020</span>
						<br />
						<span>(Black Friday)</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							MediaMarktSaturn Technology, Ingolstadt
						</span>
						<XlHiddenTimeFrame timeFrame={'Since Nov 2020 (Black Friday)'} />
						<span className="mb-1 font-medium">
							Senior Software Lead Engineer and Competency Lead for the ADPS
							team (Availability, Delivery Promise and Sourcing)
						</span>
						<ul className="list-disc list-outside ml-4">
							<li className="mb-1">
								Established a new learning culture in the team by introducing
								pair programming, coding guidelines + ADRs, weekly tech
								alignments, technical debt discussions and doing talks about
								modern technologies.
							</li>
							<li className="mb-1">
								Added relevant performance measures and KPIs for the running
								software and setting up a monitoring stack with alerting to get
								awareness of problems and solve them as soon as possible.
							</li>
							<li className="mb-1">
								Refactored existing code and implemented new microservices
								utilizing Domain Driven Design and modern tools/frameworks to
								have a performant and maintainable code base serving more than
								52 million requests per day.
							</li>
							<li className="mb-1">
								Created decoupled user interfaces to enable stakeholders to
								maintain certain configurations and do analysis on their own to
								reduce the 2nd level support requests.
							</li>
							<li className="mb-1">
								Execute job interviews and the on-boarding of new colleagues to
								find and keep the right people to work on these crucial projects
								of MediaMarktSaturn.
							</li>
							<li>Relevant Technologies:</li>
							<ul className="list-disc list-outside ml-4 text-sm">
								<li>Quarkus</li>
								<li>MongoDB</li>
								<li>Redis</li>
								<li>Google Cloud Platform</li>
								<li>Kubernetes</li>
								<li>Terraform (Enterprise)</li>
								<li>GitOps</li>
								<li>Micrometer + Prometheus + Grafana + OpsGenie</li>
								<li>Gatling Performance Testing</li>
								<li>Newman GitHub Actions for API smoke tests</li>
								<li>Kotlin</li>
								<li>Gradle</li>
								<li>Log4Brains</li>
							</ul>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Jul 2019 — Nov 2020</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							MediaMarktSaturn Technology, Ingolstadt
						</span>
						<XlHiddenTimeFrame timeFrame={'Jul 2019 — Nov 2020'} />
						<span className="mb-1 font-medium">
							Senior Software Engineer in the XCC team (Cross Channel Checkout)
						</span>
						<ul className="list-disc list-outside ml-4">
							<li className="mb-1">
								To keep alive the checkout process of a customer even if
								dependencies break is key to not loose revenue. Therefore I made
								sure during technical discussions to honor the reactive
								manifesto to stay functional by all means.
							</li>
							<li className="mb-1">
								Implemented usage of Resilience4J CircuitBreakers and Bulkheads
								for the existing Spring Boot application to have fault tolerance
								capabilities with proper fallbacks within the application.
							</li>
							<li className="mb-1">
								Introduced tools like Jacoco, SonarQube and Prometheus to the
								team for code analysis and monitoring improvements.
							</li>
							<li className="mb-1">
								In order to spread the word, I also shared our knowledge on
								different topics, e.g., resilience and microservice patterns,
								during architecture days of the company.
							</li>
							<li className="mb-1">
								Migrated core module (hexogonal architecture) to Kotlin
								Multiplatform to enable the usage of core implementations in
								other applications with offline capabilities.
							</li>
							<li className="font-medium">Relevant Technologies:</li>
							<ul className="list-disc list-inside ml-4 text-sm">
								<li>Spring Boot</li>
								<li>MongoDB</li>
								<li>Resilience4J</li>
								<li>Google Cloud Platform</li>
								<li>Kubernetes</li>
								<li>Terraform</li>
								<li>GitOps</li>
								<li>Micrometer + Influx + Prometheus + Grafana + OpsGenie</li>
								<li>JMeter</li>
								<li>Maven</li>
								<li>Java --&gt; Kotlin</li>
							</ul>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Sep 2014 — Jun 2019</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">Vogella GmbH, Hamburg</span>
						<XlHiddenTimeFrame timeFrame={'Sept 2014 — Jun 2019'} />
						<span className="mb-1 font-medium">
							IT-Consultant and Software Architect
						</span>
						<ul className="list-disc list-inside ml-3">
							<li>Trainer and consultant for several technologies</li>
							<li>Speaker on conferences and user groups</li>
							<li>Author for the Java and Eclipse magazine</li>
							<li>
								Software architect and developer for several open source
								projects
							</li>
							<li>Working onsite in international projects</li>
							<li>
								Nominated as committer of the month by the Eclipse Platform
								project
							</li>
							<li>Mentoring of students (e.g., for Google Summer of Code)</li>
							<li>Manage teams for several customers</li>
							<li>
								Creating online tutorials and documentation (e.g., on
								vogella.com)
							</li>
							<li>Creation of tools for customers (See GitHub)</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Feb 2011 — Aug 2014</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							KGU Consulting GmbH, Flensburg
						</span>
						<XlHiddenTimeFrame timeFrame={'Feb 2011 — Aug 2014'} />
						<span className="mb-1 font-medium">Software Architect</span>
						<ul className="list-disc list-inside ml-3">
							<li>Construction and development of Eclipse RCP applications</li>
							<li>Introduced a usability project</li>
							<li>
								Redesign and development of the main Rich Client application
							</li>
							<li>Development of websites by using the dojo toolkit</li>
							<li>Development of XSLT stylesheets and css</li>
							<li>Mentoring of working students</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Oct 2010 — Feb 2011</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							KGU Consulting GmbH, Flensburg
						</span>
						<XlHiddenTimeFrame timeFrame={'Oct 2010 — Feb 2011'} />
						<span className="mb-1 font-medium">Internship</span>
						<ul className="list-disc list-inside ml-3">
							<li>Developing Eclipse RCP applications and websites</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Jul 2010 — Aug 2010</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							NXP Semi Conductors, Hamburg
						</span>
						<XlHiddenTimeFrame timeFrame={'Jul 2010 — Aug 2010'} />
						<span className="mb-1 font-medium">Internship</span>
						<ul className="list-disc list-inside ml-3">
							<li>Software development, support and controlling</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Apr 2010 — Jul 2010</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">Trenz AG, Bremen</span>
						<XlHiddenTimeFrame timeFrame={'Apr 2010 — Jul 2010'} />
						<span className="mb-1 font-medium">Internship</span>
						<ul className="list-disc list-inside ml-3">
							<li>
								Development with C#, MS SQL and Windows CE for a mobile device
							</li>
							<li>
								Rollout of a inventory management software together with the
								mobile device for a hotel chain in Bremen
							</li>
						</ul>
					</div>
				</div>
			</IconLeftBorder>
		</>
	)
}
