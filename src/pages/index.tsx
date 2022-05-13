import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from '../components/SEO'
import { HomepageQuery } from '../types/graphql'
import { CategoryCard } from '../components/cards/CategoryCard'
import { GatsbyImage } from 'gatsby-plugin-image'
import bgImage from '../assets/img/me-presenting-bg.png'
import { MobileCategoryCard } from '../components/cards/MobileCategoryCard'

export const query = graphql`
	query HomepageAndAvatarQuery {
		me: file(relativePath: { eq: "img/real-avatar.jpg" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		gears: file(relativePath: { eq: "img/gears.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		springBoot: file(relativePath: { eq: "img/spring-boot.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		quarkus: file(relativePath: { eq: "img/quarkus.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		jvm: file(relativePath: { eq: "img/kotlin.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		eclipse: file(relativePath: { eq: "img/eclipse.png" }) {
			childImageSharp {
				gatsbyImageData(layout: FULL_WIDTH)
			}
		}
		webDev: file(relativePath: { eq: "img/react.png" }) {
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
`

type Props = {
	data: HomepageQuery
}

function Homepage({ data }: Props): React.ReactElement {
	return (
		<>
			<SEO title="Home" />

			<div
				className="hidden lg:block bg-blue-500 bg-no-repeat bg-cover bg-left bg-opacity-80 p-4"
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				<div className="flex flex-row ">
					<div className="flex-row mt-1 text-white">
						<div className="p-4">
							Hi,
							<br /> I love <span className="font-bold">open source</span> and
							to <span className="font-bold">share</span> my knowledge.
							<br />
							<br />
							In the future my intention is to create YouTube programming
							videos...
							<br />
							So stay tuned... 😉
							<br />
						</div>
					</div>
				</div>

				<div className="container w-1/2 grid justify-items-stretch gap-6 grid-cols-1">
					<CategoryCard
						id="1"
						title="Kotlin, Java, JVM, Testing"
						description="Tutorials on how to use these JVM languages"
						gatsbyImageData={data!.jvm!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>

					<CategoryCard
						id="1"
						title="Spring Boot"
						description="Tutorials about Spring Boot applications"
						gatsbyImageData={data!.springBoot!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>

					<CategoryCard
						id="1"
						title="Quarkus"
						description="Tutorials about Quarkus applications"
						gatsbyImageData={data!.quarkus!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>

					<CategoryCard
						id="1"
						title="Web Frontend Development"
						description="Tutorials about React JS, TypeScript, Gatsby"
						gatsbyImageData={data!.webDev!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>

					<CategoryCard
						id="1"
						title="Eclipse RCP"
						description="Tutorials about the Eclipse IDE and Eclipse Rich Client Platform"
						gatsbyImageData={data!.eclipse!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>

					<CategoryCard
						id="1"
						title="Tools and Technology"
						description="General Sections about tools and technology, e.g., git, GitHub and more"
						gatsbyImageData={data!.gears!.childImageSharp!.gatsbyImageData}
						path="/tutorials"
					/>
				</div>
			</div>

			<div className="lg:hidden container mx-auto grid justify-items-stretch gap-2 grid-cols-1">
				<MobileCategoryCard
					id="1"
					title="Kotlin, Java, JVM, Testing"
					description="Tutorials on how to use these JVM languages"
					gatsbyImageData={data!.jvm!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>

				<MobileCategoryCard
					id="1"
					title="Spring Boot"
					description="Tutorials about Spring Boot applications"
					gatsbyImageData={data!.springBoot!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>

				<MobileCategoryCard
					id="1"
					title="Quarkus"
					description="Tutorials about Quarkus applications"
					gatsbyImageData={data!.quarkus!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>

				<MobileCategoryCard
					id="1"
					title="Web Frontend Development"
					description="Tutorials about React JS, TypeScript, Gatsby"
					gatsbyImageData={data!.webDev!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>

				<MobileCategoryCard
					id="1"
					title="Eclipse RCP"
					description="Tutorials about the Eclipse IDE and Eclipse Rich Client Platform"
					gatsbyImageData={data!.eclipse!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>

				<MobileCategoryCard
					id="1"
					title="Tools and Technology"
					description="General Sections about tools and technology, e.g., git, GitHub and more"
					gatsbyImageData={data!.gears!.childImageSharp!.gatsbyImageData}
					path="/tutorials"
				/>
			</div>
		</>
	)
}

export default Homepage
