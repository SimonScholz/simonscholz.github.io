import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { FlexInitialXlBlock } from './FlexInitialXlBlock'
import { IconLeftBorder } from './IconLeftBorder'
import { XlHiddenTimeFrame } from './XlHiddenTimeFrame'

export function Education(): React.ReactElement {
	const { education } = useStaticQuery(
		graphql`
			query EducationQuery {
				education: file(relativePath: { eq: "img/education.png" }) {
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
				fluid={education.childImageSharp.gatsbyImageData}
				title="Education"
			>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>2007 — 2011</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							Business Informatics (B. Sc.), Flensburg
						</span>
                        <XlHiddenTimeFrame timeFrame={"2007 — 2011"}/>
						<span className='mb-1'>University of Applied Sciences</span>
						<span className="underline">Title of the bachelor thesis:</span>
						<span>
							"Development of a software component for improving the usability
							of a content management system"
						</span>
						<div className="flex flex-row">
							<span className="underline mr-2">Grade: </span>
							<span>1.0</span>
						</div>
						<span className="underline mt-1">Voluntary extra courses:</span>
						<ul className="list-disc list-inside ml-3">
							<li>Java Basics</li>
							<li>Java with GWT</li>
							<li>Android Development</li>
							<li>Tutor for new students concerning software development</li>
						</ul>
					</div>
				</div>
				<div className="flex md:flex-row mt-3">
					<FlexInitialXlBlock>
						<span>1998 — 2007</span>
					</FlexInitialXlBlock>
					<div className="flex-1 flex flex-col">
						<span className="font-semibold">
							Gymnasium Lornsenschule, Schleswig
						</span>
                        <XlHiddenTimeFrame timeFrame={"1998 — 2007"}/>
						<div>
							<span className="underline mr-2">Degree:</span>
							<span>Abitur</span>
						</div>
						<span className="underline mt-1">Examination subjects:</span>
						<ul className="list-disc list-inside ml-3">
							<li>Math</li>
							<li>English</li>
							<li>History</li>
							<li>Informatics</li>
						</ul>
					</div>
				</div>
			</IconLeftBorder>
		</>
	)
}
