import React from 'react'
import { SEO } from '../components/SEO'

const Contact = (): React.ReactElement => {
	return (
		<>
			<SEO title="Contact" metaDescription="Contact" />
			<div className="m-2 flex flex-col">
				<h1 className="text-xl">Contact</h1>
				<p className="mt-2">
					Hey,
					<br /> you can reach out to me via email (
					<a className="text-blue-500" href="mailto:opensource.simon@gmail.com">
						opensource.simon@gmail.com
					</a>
					) or on social media like{' '}
					<a className="text-blue-500" href="https://twitter.com/simonscholz">
						twitter.com/simonscholz
					</a>
					.
				</p>
				<p>I am really happy to receive feedback about my content.</p>
			</div>
		</>
	)
}

export default Contact
