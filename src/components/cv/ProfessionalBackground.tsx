import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { IconLeftBorder } from './IconLeftBorder'

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
					<div className="flex-1">
						<span>Since 11/2020</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							Mediamarkt Saturn Technology, Ingolstadt
						</span>
						<span>
							Senior Software Lead Engineer and Competency Lead for the "ADPS -
							Availability, Delivery Promise and Sourcing" team
						</span>
						<ul className="list-disc list-inside ml-3">
							<li>
								I switched teams to establish the same good principals we've
								established in the "Cross Channel Checkout" (my former team at
								Mediamarkt Saturn Technology). Therefore also got the leadership
								of the team. It was a longer journey, but we've finally made it.
								Domain Driven Design helped to find proper bounded contexts of
								the different services. Existing services were rewritten to
								honor these bounded contexts.
							</li>
							<li>
								The Quarkus framework is utilized to have the performance gains
								of reactive programming, because the ADPS backend services have
								the most traffic in the company with 52 million requests per day
								on average.
							</li>
							<li>
								To reduce the amount of second level support requests and to do
								certain configurations in an easier fashion small back office
								front end applications have been created to enable stakeholders
								to maintain certain configurations.
							</li>
							<li>
								Being in the role of the Competency Lead, we established weekly
								tech alignments with the whole team to talk about technical
								debts of the services and discuss strategies to overcome these
								or talk about new upcoming technologies, which might be useful
								for our products. Meanwhile we also have such alignments with
								the whole domain. Lots of topics of the tech alignments also
								result in ADRs (architecture decision records) and visualized
								using Log4Brains and GitHubs Pages.
							</li>
							<li>Relevant Technologies:</li>
							<ul className="list-disc list-inside ml-4 text-sm">
								<li>Quarkus</li>
								<li>MongoDB</li>
								<li>Redis</li>
								<li>Micrometer Metrics</li>
								<li>Google Cloud Platform</li>
								<li>Kubernetes</li>
								<li>Terraform (Enterprise)</li>
								<li>GitOps</li>
								<li>Prometheus</li>
								<li>Grafana</li>
								<li>OpsGenie on call duty</li>
								<li>Gatling Performance Testing</li>
								<li>Newman GitHub Actions for API smoke tests</li>
								<li>Kotlin</li>
								<li>Gradle</li>
								<li>TypeScript</li>
								<li>React JS</li>
								<li>Graphql</li>
								<li>MobX</li>
							</ul>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>07/2019 – 11/2020</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							Mediamarkt Saturn Technology, Ingolstadt
						</span>
						<span>
							Senior Software Engineer in the "Cross Channel Checkout" team
						</span>
						<ul className="list-disc list-inside ml-3">
							<li>
								The Cross Channel Checkout is basically the backend application,
								which is responsible for orchestrating everything around the
								basket in the webshop of Mediamarkt, Saturn and applications
								used by various different salesperson's applications.
							</li>
							<li>
								Since the checkout of a customer's basket is the part where the
								actual sale happens and the company thereby earns money we've
								put a huge amount of effort into making the application as
								resilient and scalable as possible. In order to archive this the
								majority of data used by the application is imported
								asynchronously and/or message driven using import jobs triggered
								by Google PubSub events originated by our own GCP Cloud
								Schedulers or respective teams sending uns data asynchronously.
							</li>
							<li>
								Of course fault tolerance plays an import role here and is
								archived by using cloud technologies of the Google Cloud
								Platform and others, e.g., Terraform Enterprise, Kubernetes with
								GitOps, Cloud Atlas of MongoDB and more...
							</li>
							<li>
								Also the application itself (written with Spring Boot) uses
								Resilience4J as fault tolerant library, providing things like
								Bulkheads, Circuitbreaker and monitoring out of the box.
							</li>
							<li>
								The main service utilizes Domain Driven Design and uses the
								hexagonal architecture (ports & adapters) to have a solid and
								maintainable code base.
							</li>
							<li>
								In order to spread the word, I also shared our knowledge on
								different topics, e.g., resilience and micro service patterns,
								during architecture days of the company.
							</li>
							<li>
								Since the service has it's core domain logic, which is decoupled
								from the infrastructure(hexagonal architecture) I started
								migrating the core module from Java to Kotlin to gain on the one
								hand to improvements of the Kotlin language and also utilize
								Kotlin's multi platform capabilities to use the core logic also
								in other applications, e.g., applications for stores, which are
								also supposed to continue working offline.
							</li>
							<li>Relevant Technologies:</li>
							<ul className="list-disc list-inside ml-4 text-sm">
								<li>Spring Boot</li>
								<li>MongoDB</li>
								<li>Hystrix --&gt; Resilience4J</li>
								<li>Micrometer Metrics</li>
								<li>Google Cloud Platform</li>
								<li>Kubernetes</li>
								<li>Terraform</li>
								<li>GitOps</li>
								<li>Influxdb</li>
								<li>Prometheus</li>
								<li>Grafana</li>
								<li>OpsGenie on call duty</li>
								<li>JMeter</li>
								<li>Maven</li>
								<li>Java --&gt; Kotlin</li>
							</ul>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>09/2014 - 06/2019</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">Vogella GmbH, Hamburg</span>
						<span>IT-Consultant and Software Architect</span>
						<ul className="list-disc list-inside ml-3">
							<li>Trainer and consultant for several technologies</li>
							<li>Speaker on conferences and user groups</li>
							<li>Author for the Java and Eclipse magazine</li>
							<li>
								Software architect and developer for several open source
								projects
							</li>
							<li>Operating international</li>
							<li>Eclipse Platform Committer</li>
							<li>
								Nominated as committer of the month by the Eclipse Platform
								project
							</li>
							<li>Mentoring of students(e.g., for Google Summer of Code)</li>
							<li>Manage teams for several customers</li>
							<li>
								Creating online tutorials and documentation(e.g., on
								vogella.com)
							</li>
							<li>Creation of tools for customers (See GitHub)</li>
							<li>Open Source everywhere (Ubuntu as OS)</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>02/2011 – 08/2014</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							KGU Consulting GmbH, Flensburg
						</span>
						<span>Software Architect</span>
						<ul className="list-disc list-inside ml-3">
							<li>Developing Eclipse RCP applications</li>
							<li>Introduced a usability project</li>
							<li>
								Redesign and development of the "Techpub Studio" application
							</li>
							<li>Development of website by using the dojo toolkit</li>
							<li>Development of XSLT stylesheets and css</li>
							<li>Learned a lot about several Java frameworks and libraries</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>10/2010 – 02/2011</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							KGU Consulting GmbH, Flensburg
						</span>
						<span>Internship</span>
						<ul className="list-disc list-inside ml-3">
							<li>Developing Eclipse RCP applications and websites</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>07/2010 – 08/2010</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">NXP Semi Conductors, Hamburg</span>
						<span>Internship</span>
						<ul className="list-disc list-inside ml-3">
							<li>Software development, support and controlling</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<div className="flex-1">
						<span>04/2010 – 07/2010</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">Trenz AG, Bremen</span>
						<span>Internship</span>
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
