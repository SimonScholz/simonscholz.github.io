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
						<span>Since  Nov 2020</span>
						<br />
						<span>(Black Friday)</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							Mediamarkt Saturn Technology, Ingolstadt
						</span>
						<XlHiddenTimeFrame timeFrame={'Since Nov 2020 (Black Friday)'} />
						<span className="mb-1 font-medium">
							Senior Software Lead Engineer and Competency Lead for the ADPS (
							Availability, Delivery Promise and Sourcing) team
						</span>
						<span className="mb-1">
							I switched teams to establish the same good principals we've
							established in the Cross Channel Checkout product (in my former team at
							Mediamarkt Saturn Technology) and became the lead of the ADPS team.
						</span>
						<span>
							Domain Driven Design helped to find proper bounded contexts of the
							different requirements of the product.
							Existing services have been refactored
							to meet the goal of solid services.
							Later on services have been
							rewritten to properly honor these bounded contexts and met the
							expectations of modern software.
						</span>
						<span className="mb-1">
							The Quarkus framework is utilized to have the performance gains of
							reactive programming, because the ADPS backend services have the
							most traffic in the company with 52 million requests from clients
							per day on average and a lot of asynchronous messaging in behind.
						</span>
						<span className="mb-1">
							To reduce the amount of second level support requests and to do
							certain configurations in an easier fashion small back office
							front end applications have been created to enable stakeholders to
							maintain certain configurations and do certain analysis on their
							own.
						</span>
						<span className="mb-1">
							At the very beginning to improve the maturity of the team I
							established weekly tech alignments with the whole team to talk
							about technical debts of the services and discuss strategies to
							overcome these or talk about new upcoming technologies, which
							might be useful for our products. Meanwhile we also have such
							alignments with the whole domain. Lots of topics of the tech
							alignments also result in ADRs (architecture decision records) and
							visualized using Log4Brains and GitHubs Pages.
						</span>
						<span className="font-medium">Relevant Technologies:</span>
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
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Jul 2019 — Nov 2020</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							Mediamarkt Saturn Technology, Ingolstadt
						</span>
						<XlHiddenTimeFrame timeFrame={'Jul 2019 — Nov 2020'} />
						<span className="mb-1 font-medium">
							Senior Software Engineer in the XCC (Cross Channel Checkout) team
						</span>
						<span className="mb-1">
							The Cross Channel Checkout is basically the backend application,
							which is responsible for orchestrating everything around the
							basket in the web shop of Mediamarkt, Saturn and applications used
							by various different salesperson's applications.
						</span>
						<span className="mb-1">
							Since the checkout of a customer's basket is the part where the
							actual sale happens and the company thereby earns money we've put
							a huge amount of effort into making the application as resilient
							and scalable as possible. In order to archive this the majority of
							data used by the application is imported asynchronously and/or
							message driven using import jobs triggered by Google PubSub events
							originated by our own GCP Cloud Schedulers or respective teams
							sending uns data asynchronously.
						</span>
						<span className="mb-1">
							Of course fault tolerance plays an import role here and is
							archived by using cloud technologies of the Google Cloud Platform
							and others, e.g., Terraform Enterprise, Kubernetes with GitOps,
							Cloud Atlas of MongoDB and more...
						</span>
						<span className="mb-1">
							Also the application itself (written with Spring Boot) uses
							Resilience4J as fault tolerant library, providing things like
							Bulkheads, Circuitbreaker and monitoring out of the box.
						</span>
						<span className="mb-1">
							The main service utilizes Domain Driven Design and uses the
							hexagonal architecture (ports & adapters) to have a solid and
							maintainable code base.
						</span>
						<span className="mb-1">
							In order to spread the word, I also shared our knowledge on
							different topics, e.g., resilience and micro service patterns,
							during architecture days of the company.
						</span>
						<span className="mb-1">
							Since the service has it's core domain logic, which is decoupled
							from the infrastructure(hexagonal architecture) I started
							migrating the core module from Java to Kotlin to gain on the one
							hand to improvements of the Kotlin language and also utilize
							Kotlin's multi platform capabilities to use the core logic also in
							other applications, e.g., applications for stores, which are also
							supposed to continue working offline.
						</span>
						<span className="font-medium">Relevant Technologies:</span>
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
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>Sep 2014 — Jun 2019</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">Vogella GmbH, Hamburg</span>
						<XlHiddenTimeFrame timeFrame={"Sept 2014 — Jun 2019"}/>
						<span className="mb-1 font-medium">IT-Consultant and Software Architect</span>
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
					<FlexInitialXlBlock>
						<span>Feb 2011 — Aug 2014</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							KGU Consulting GmbH, Flensburg
						</span>
						<XlHiddenTimeFrame timeFrame={"Feb 2011 — Aug 2014"}/>
						<span className="mb-1 font-medium">Software Architect</span>
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
					<FlexInitialXlBlock>
						<span>Oct 2010 — Feb 2011</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold xl:mb-1">
							KGU Consulting GmbH, Flensburg
						</span>
						<XlHiddenTimeFrame timeFrame={"Oct 2010 — Feb 2011"}/>
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
