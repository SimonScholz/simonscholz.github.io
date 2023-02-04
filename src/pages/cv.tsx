import { graphql } from 'gatsby'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaperPlane,
	faBaby,
	faPhone,
	faHouse,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { SEO } from '../components/SEO'
import { ProfessionalBackground } from '../components/cv/ProfessionalBackground'
import { Education } from '../components/cv/Education'
import { SpecialKnowledge } from '../components/cv/SpecialSkills'
import { HomepageQuery } from '../types/graphql'
import { GatsbyImage } from 'gatsby-plugin-image'
import { TrainingsCertificates } from '../components/cv/TrainingsCertificates'

export const query = graphql`
	query CVAvatarQuery {
		me: file(relativePath: { eq: "img/me.png" }) {
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

function CV({ data }: Props): React.ReactElement {
	return (
		<>
			<SEO title="CV" />

			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/3 p-2 text-center print:hidden">
					<GatsbyImage
						image={data!.me!.childImageSharp!.gatsbyImageData}
						alt="Me"
						className="rounded-md m-3"
					/>
					<span className="font-semibold text-xl text-blue-500">
						Simon Scholz
						<br />* 27.04.1986
					</span>
				</div>
				<div className="hidden print:block">
					<div className="flex flex-row justify-between">
						<div className="flex flex-col">
							<h1 className="text-3xl text-blue-500 mb-4">Simon Scholz</h1>
							<div className="flex flex-col bg-blue-500 mt-2 pt-6 pl-6 pb-6 pr-10 rounded-md text-gray-300">
								<div className="p-1">
									<FontAwesomeIcon icon={faLocationDot} className="mr-1" />
									<span>Uckermarkweg 12a, 22415 Hamburg</span>
								</div>
								<span className="p-1">
									<FontAwesomeIcon icon={faBaby} className="mr-1" />
									born 27.04.1986 in Schleswig
								</span>
								<span className="p-1">
									<FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
									<a href="mailto:opensource.simon@gmail.com">
										opensource.simon@gmail.com
									</a>
								</span>
								<span className="p-1">
									<FontAwesomeIcon icon={faPhone} className="mr-1" />
									+49 176 43 622 060
								</span>
								<span className="p-1">
									<FontAwesomeIcon icon={faHouse} className="mr-1" />
									<a href="https://simonscholz.github.io">
										https://simonscholz.github.io
									</a>
								</span>
							</div>
						</div>
						<div className="w-1/3">
							<GatsbyImage
								image={data!.me!.childImageSharp!.gatsbyImageData}
								alt="Me"
								className="rounded m-3"
							/>
						</div>
					</div>
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

export default CV
