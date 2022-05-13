import { Link } from 'gatsby'
import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface Props {
	path: string
	id: string
	title: string
	description: string
	gatsbyImageData: IGatsbyImageData
}

export const CategoryCard = ({
	path,
	id,
	title,
	description,
	gatsbyImageData,
}: Props): React.ReactElement => {
	return (
		<Link to={path} key={id}>
			<div className="mt-3 mx-3 cursor-pointer border border-gray-400 bg-white bg-opacity-70 rounded-lg p-4 h-12 flex flex-row justify-between hover:shadow-lg  items-center">
				<div className="text-gray-900 font-bold text-xl">{title}</div>
				<div className="flex ml-5 border border-gray-400 bg-white bg-opacity-70 w-16 h-16 rounded-full">
					<GatsbyImage
						image={gatsbyImageData}
						alt="Category Image"
						className="w-16 h-16 rounded-full"
					/>
				</div>
			</div>
		</Link>
	)
}
