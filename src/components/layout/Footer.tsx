import React from 'react'
import { Link } from 'gatsby'

export const Footer = (): React.ReactElement => {
	return (
		<div className="container flex flex-col md:flex-row md:justify-between mx-auto border-t-2 mt-8">
			<div className="block md:flex-grow text-gray-800 ml-4">
				© Simon Scholz {new Date().getFullYear()}
			</div>
			<div className="block ml-4">
				{/** 
				<Link
					to="/faq"
					className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"
				>
					FAQ
				</Link>
								*/}
				<Link
					to="/contact"
					className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"
				>
					Contact
				</Link>
				<Link
					to="/impressum"
					className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"
				>
					Impressum
				</Link>
				<Link
					to="/privacy-policy"
					className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"
				>
					Privacy Policy
				</Link>
				<a
					href="/sitemap.xml"
					className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-black mr-4"
				>
					Sitemap
				</a>
			</div>
		</div>
	)
}
