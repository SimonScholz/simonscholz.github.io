import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import { IconLeftBorder } from './IconLeftBorder'

export function Education(): React.ReactElement {
	const { education } = useStaticQuery(
		graphql`query EducationQuery {
  education: file(relativePath: {eq: "img/education.png"}) {
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

	return <>
        <IconLeftBorder fluid={education.childImageSharp.gatsbyImageData} title="Education">
            <div className="flex md:flex-row mt-3">
                <div className="flex-initial w-64">
                    <span>2007 - 2011</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="font-semibold">Business Informatics (B. Sc.)</span>
                    <span>University of Applied Sciences</span>
                    <span className="underline">Title of the bachelor thesis:</span>
                    <span>
                        "Development of a software component for improving the usability
                        of a content management system"
                    </span>
                    <div className="flex flex-row">
                        <span className="underline mr-2">Grade: </span>
                        <span>1.0</span>
                    </div>
                    <span className="underline">Voluntary extra courses:</span>
                    <ul className="list-disc list-inside ml-3">
                        <li>Java Basics</li>
                        <li>Java with GWT</li>
                        <li>Android Development</li>
                        <li>Tutor for new students concerning software development</li>
                    </ul>
                </div>
            </div>
            <div className="flex md:flex-row mt-3">
                <div className="flex-initial w-64">
                    <span>1998 - 2007</span>
                </div>
                <div className="flex-1 flex flex-col">
                    <span className="font-semibold">
                        Gymnasium Lornsenschule, Schleswig
                    </span>
                    <div>
                        <span className="underline mr-2">Degree:</span>
                        <span>Abitur</span>
                    </div>
                    <span className="underline">Examination subjects:</span>
                    <ul className="list-disc list-inside ml-3">
                        <li>Math</li>
                        <li>English</li>
                        <li>History</li>
                        <li>Informatics</li>
                    </ul>
                </div>
            </div>
        </IconLeftBorder>
    </>;
}
