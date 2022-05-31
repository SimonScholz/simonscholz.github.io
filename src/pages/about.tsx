import { graphql, Link } from 'gatsby'
import React from 'react'
import { SEO } from '../components/SEO'
import bgImage from '../assets/img/me-presenting-bg.webp'
import { AboutQuery } from '../types/graphql'

export const query = graphql`
	query AboutQuery {
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
	}
`

type Props = {
	data: AboutQuery
}

function About({ data }: Props): React.ReactElement {
	return (
		<>
			<SEO title="About Me" />

			<div
				className="bg-blue-500 bg-no-repeat bg-cover bg-right p-4"
				style={{ backgroundImage: `url(${bgImage})` }}
			>
				<div className="flex flex-col md:mt-32 mb-10">
					<div className="flex-row text-gray-600 font-serif bg-white bg-opacity-50 border-2 p-4 border-opacity-50 md:w-2/3 rounded-lg">
						I love <span className="font-bold">open source</span> and to{' '}
						<span className="font-bold">share</span> my knowledge.
						<br />
						Besides that I've started to develop my first website at the age of
						twelve and have been computer addicted even earlier.
						<br />
						This <span className="font-bold">fascination</span> for computers
						and technologies remains until today ({new Date().toUTCString()})
						<br />
						If you're <span className="font-bold">passionate</span> about
						something you're usually also good at doing it...
						<br />
						And one of the best things of being a developer is that you can
						craft code to automate things you're{' '}
						<span className="font-bold">not</span> passionate about. <br />{' '}
						Automatization over manual work is kind of my credo and I've already
						pushed a lot of customers in that direction for the better. 😉
						<br />
						<br />
						Currently I work as a senior software engineer at MediaMarktSaturn.
						<br />I am leading the team, which is reponsible for calculating
						delivery times, giving delivery promises, doing reservations of
						products and implementing the rules on how to determine a proper
						outlet/warehouse as source for the products to deliver.
						<br /> The applications, which serve this purpose are realized with
						Spring Boot and Quarkus and written in Kotlin. For more insights on
						the tech stack I am usually using you can also check out my{' '}
						<Link to="/cv#special-skills" className="font-semibold">
							tech
						</Link>{' '}
						or{' '}
						<Link to="/tutorials" className="font-semibold">
							tutorials
						</Link>{' '}
						section.
						<br />I also have the honor to be competency lead of the team with
						the goal to offer great opportunities for my team members to evolve.
						<br />
						<br /> Before being with MediaMarktSaturn I've been working for
						vogella, an open source company founded by the Java Champion Lars
						Vogel. While being with vogella I gave a lot of trainings for a
						large variaty of companies.
						<br /> Besides trainings we offered remote and onsite support for
						the technologies we taught during our trainings. In order to deliver
						high quality bleeding edge knowledge for the customers, we were also
						heavily involved in contributing to the Open Source technologies
						that we taught during our trainings, Eclipse 4 RCP, Testing, Spring
						Boot, build tools (Gradle + Maven) to name a few.
						<br />
						<br />
						During that time I've done a couple of talks and workshops on
						Hackathons, Eclipse Demo Camps, Java User Groups, EclipseCon, Jax,
						Java Forum Stuttgart and Devoxx.
						<br />
						<br />
						For more details, also see my{' '}
						<Link to="/cv" className="font-semibold">
							CV
						</Link>
						.
					</div>
				</div>
			</div>
		</>
	)
}

export default About
