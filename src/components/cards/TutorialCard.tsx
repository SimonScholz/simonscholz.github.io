import { Link } from 'gatsby'
import React from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface Props {
	path: string
	id: string
	title: string
	timeToRead: string
	description: string
	gatsbyImageData: IGatsbyImageData
	author: string
	date: string
}

export const TutorialCard = ({
	path,
	id,
	title,
	timeToRead,
	description,
	gatsbyImageData,
	author,
	date,
}: Props): React.ReactElement => {
	return (
		<Link to={path} key={id}>
			<div className="mt-3 mx-3 cursor-pointer">
				<div className="border border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal hover:shadow-lg">
					<div className="mb-8">
						<div className="text-gray-900 font-bold text-xl">{title}</div>
						<p className="text-gray-600 mb-2">{timeToRead} min read</p>
						<p className="text-gray-700 text-base">{description}</p>
					</div>
					<div className="flex items-center">
						<GatsbyImage
							image={gatsbyImageData}
							alt="Avatar"
							className="w-10 h-10 rounded-full mr-4"
						/>
						<div className="text-sm">
							<p className="text-gray-900 leading-none">{author}</p>
							<p className="text-gray-600">{date}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
