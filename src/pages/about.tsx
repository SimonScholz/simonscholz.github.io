import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from '../components/SEO'
import { ProfessionalBackground } from '../components/cv/ProfessionalBackground'
import { Education } from '../components/cv/Education'
import { SpecialKnowledge } from '../components/cv/SpecialKnowledge'
import { HomepageQuery } from '../types/graphql'
import Img from 'gatsby-image'
import { TrainingsCertificates } from '../components/cv/TrainingsCertificates'

export const query = graphql`
	query AboutAvatarQuery {
		me: file(relativePath: { eq: "img/me.png" }) {
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
`

type Props = {
	data: HomepageQuery
}

function Homepage({ data }: Props): React.ReactElement {
	return (
		<>
			<SEO title="About Me" metaDescription="About Simon Scholz" />

			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/3 p-2 text-center">
					<Img
						fluid={data!.me!.childImageSharp!.fluid}
						alt="Me"
						className="rounded-md m-3"
					/>
					<span className="font-semibold text-xl text-blue-500">
						Simon Scholz
						<br />* 27.04.1986
					</span>
				</div>
				<div className="md:w-2/3 p-2 mt-2">
					<ProfessionalBackground />
					<Education />
					<SpecialKnowledge />
					<TrainingsCertificates />
				</div>
			</div>
		</>
	)
}

export default Homepage
