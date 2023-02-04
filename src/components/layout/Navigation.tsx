import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Social } from '../Social'

type Props = {
	children?: React.ReactNode
}

export const Navigation = ({ children }: Props): React.ReactElement => {
	const data = useStaticQuery(graphql`
		query MyQuery {
			file(relativePath: { eq: "img/avatar.png" }) {
				childImageSharp {
					gatsbyImageData(width: 40, height: 40, layout: FIXED)
				}
			}
		}
	`)

	const [showNav, setShowNav] = useState(false)

	return (
		<nav className="flex flex-col justify-between md:flex-row bg-blue-500 p-2 print:hidden">
			<div className="flex items-center md:flex-grow flex-shrink-0 text-white justify-between md:justify-start">
				<GatsbyImage
					image={data.file.childImageSharp.gatsbyImageData}
					alt="Avatar"
					className="w-10 h-10 rounded-full mr-4"
				/>
				<span className="font-semibold text-xl tracking-tight">
					Simon Scholz
				</span>
				<div className="flex ml-6 hidden md:block">
					<div className="md:flex-grow">
						<Link
							to="/"
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 border-blue-500 border-b-2 hover:border-white hover:text-white mr-4"
						>
							Home
						</Link>
						<Link
							to="/about"
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 border-blue-500 border-b-2 hover:border-white hover:text-white mr-4"
						>
							About me
						</Link>
						<Link
							to="/tutorials"
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 border-blue-500 border-b-2 hover:border-white hover:text-white"
						>
							Tutorials
						</Link>
					</div>
				</div>
				<div className="flex-end md:hidden">
					<button
						onClick={(e) => setShowNav(!showNav)}
						className="flex flex-end items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white focus:outline-none"
					>
						<svg
							className="fill-current h-3 w-3"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
						</svg>
					</button>
				</div>
			</div>
			<div className={showNav ? 'block md:hidden' : 'hidden md:hidden'}>
				<div className="flex md:hidden">
					<div className="md:flex-grow">
						<Link
							to="/"
							onClick={(e) => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							Home
						</Link>
						<Link
							to="/about"
							onClick={(e) => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							About me
						</Link>
						<Link
							to="/tutorials"
							onClick={(e) => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white"
						>
							Tutorials
						</Link>
					</div>
				</div>
				<div className="flex flex-grow-0 mt-4 md:mt-2">
					<Social
						linkedIn="https://www.linkedin.com/in/simon-scholz-080355113/"
						github="https://github.com/simonscholz"
						twitter="https://twitter.com/simonscholz"
						youtube="https://www.youtube.com/channel/UC8j16uUiiMQpMTemLBfCURA/"
					/>
				</div>
			</div>
			<div className="flex flex-grow-0 mt-4 md:mt-2 hidden md:flex">
				<Social
					linkedIn="https://www.linkedin.com/in/simon-scholz-080355113/"
					github="https://github.com/simonscholz"
					twitter="https://twitter.com/simonscholz"
					youtube="https://www.youtube.com/channel/UC8j16uUiiMQpMTemLBfCURA/"
				/>
			</div>
		</nav>
	)
}
