import React, { useState } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Social } from '../Social'

type Props = {
	children?: React.ReactNode
}

export const Navigation = ({ children }: Props): React.ReactElement => {
	const data = useStaticQuery(graphql`
		query MyQuery {
			file(relativePath: { eq: "img/avatar.png" }) {
				childImageSharp {
					# Specify the image processing specifications right in the query.
					fixed(width: 40, height: 40) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`)

	const [showNav, setShowNav] = useState(false)

	return (
		<nav className="flex flex-col justify-between md:flex-row bg-blue-500 p-2">
			<div className="flex items-center md:flex-grow flex-shrink-0 text-white justify-between md:justify-start">
				<Img
					fixed={data.file.childImageSharp.fixed}
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
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							Home
						</Link>
						<Link
							to="/about"
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							About me
						</Link>
						<Link
							to="/tutorials"
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white"
						>
							Tutorials
						</Link>
					</div>
				</div>
				<div className="flex-end md:hidden">
					<button
						onClick={e => setShowNav(!showNav)}
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
							onClick={e => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							Home
						</Link>
						<Link
							to="/about"
							onClick={e => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white mr-4"
						>
							About me
						</Link>
						<Link
							to="/tutorials"
							onClick={e => setShowNav(false)}
							className="block mt-4 md:inline-block md:mt-0 text-gray-100 hover:text-white"
						>
							Tutorials
						</Link>
					</div>
				</div>
				<div className="flex flex-grow-0 mt-4 md:mt-2">
					<Social
						github="https://github.com/simonscholz"
						twitter="https://twitter.com/simonscholz"
						youtube="https://www.youtube.com/channel/UC8j16uUiiMQpMTemLBfCURA/"
					/>
				</div>
			</div>
			<div className="flex flex-grow-0 mt-4 md:mt-2 hidden md:flex">
				<Social
					github="https://github.com/simonscholz"
					twitter="https://twitter.com/simonscholz"
					youtube="https://www.youtube.com/channel/UC8j16uUiiMQpMTemLBfCURA/"
				/>
			</div>
		</nav>
	)
}
