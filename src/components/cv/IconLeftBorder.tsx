import React from 'react'
import Img, { FluidObject } from 'gatsby-image'

interface Props {
	fluid: FluidObject
	title: String
}

export const IconLeftBorder: React.FunctionComponent<Props> = ({
	fluid,
	title,
	children,
}) => {
	return (
		<>
			<div className="flex flex-row mb-2 items-center">
				<Img
					fluid={fluid}
					alt="Avatar"
					className="w-12 h-12 rounded-full bg-gray-200 mr-3"
				/>
				<span className="text-xl text-blue-500">{title}</span>
			</div>
			<div className="border-l-2 pl-8 ml-6 mb-3">{children}</div>
		</>
	)
}
