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
						<span>Since 07/2019</span>
					</div>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							Mediamarkt Saturn IT, Ingolstadt
						</span>
						<span>Senior Software Architect and Competency Lead</span>
						<ul className="list-disc list-inside ml-3">
							<li>Full Stack Developer</li>
							<li>Cross channel checkout service</li>
							<li>Backoffice application for fiscal services with React JS</li>
							<li>Lead Engineer of the Customer Delivery Promise service</li>
							<li>Technologies:</li>
							<ul className="list-disc list-inside ml-4 text-sm">
								<li>Spring Boot</li>
								<li>Quarkus</li>
								<li>Micrometer Metrics</li>
								<li>Kubernetes</li>
								<li>Terraform</li>
								<li>GitOps</li>
								<li>Influxdb</li>
								<li>Prometheus</li>
								<li>Grafana</li>
								<li>JMeter</li>
								<li>Java</li>
								<li>Kotlin</li>
								<li>TypeScript</li>
								<li>React JS</li>
								<li>Graphql</li>
								<li>Formik</li>
								<li>Redux</li>
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
