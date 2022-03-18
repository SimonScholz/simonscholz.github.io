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
			<div className="mt-3 mx-3 cursor-pointer">
				<div className="border border-gray-400 bg-white rounded-lg p-4 flex flex-row justify-between leading-normal hover:shadow-lg">
					<div className="mb-8">
						<div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
						<p className="text-gray-700 text-base">{description}</p>
					</div>
					<div className="flex items-center ml-5">
						<GatsbyImage
							image={gatsbyImageData}
							alt="Category Image"
							className="w-20 h-20 rounded-full mr-4"
						/>
					</div>
				</div>
			</div>
		</Link>
	)
}
