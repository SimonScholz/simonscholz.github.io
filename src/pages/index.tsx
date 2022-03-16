import { graphql } from 'gatsby'
import React from 'react'
import { SEO } from '../components/SEO'
import { ProfessionalBackground } from '../components/cv/ProfessionalBackground'
import { Education } from '../components/cv/Education'
import { SpecialKnowledge } from '../components/cv/SpecialSkills'
import { HomepageQuery } from '../types/graphql'
import { GatsbyImage } from 'gatsby-plugin-image'

export const query = graphql`
	query HomepageAndAvatarQuery {
		me: file(relativePath: { eq: "img/real-avatar.png" }) {
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

			<div className="flex flex-col md:flex-row">
				<div className="md:w-2/3 p-2 mt-5">
					Hi guys,
					<br /> I love open source and to share my knowledge. That's why I
					created this website. <br />
					This website has been created by using Gatsby JS.
					<br />
					In the future my intention is to create YouTube programming videos...
					<br />
					So stay tuned. ;-)
					<br />
				</div>
				<div className="md:w-1/3 p-2">
					<GatsbyImage
						image={data!.me!.childImageSharp!.gatsbyImageData}
						alt="Me"
						className="rounded-full m-3"
					/>
				</div>
			</div>
		</>
	)
}

export default Homepage
