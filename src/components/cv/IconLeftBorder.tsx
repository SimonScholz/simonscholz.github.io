import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface Props {
	fluid: IGatsbyImageData
	title: String
	children: any
}

export const IconLeftBorder: React.FunctionComponent<Props> = ({
	fluid,
	title,
	children,
}) => {
	return (
		<>
			<div className="flex flex-row mb-2 items-center">
				<GatsbyImage
					image={fluid}
					alt="Avatar"
					loading="eager"
					className="w-12 h-12 rounded-full bg-gray-200 mr-3"
				/>
				<span className="text-xl text-blue-500">{title}</span>
			</div>
			<div className="border-l-2 pl-8 ml-6 mb-3">{children}</div>
		</>
	)
}
