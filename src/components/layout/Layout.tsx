import React from 'react'
import '../../assets/fonts/loader.css'
import '../../css/main.css'
import { HtmlHead } from './HtmlHead'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import CookieConsent from 'react-cookie-consent'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ReactGA from 'react-ga'

type Props = {
	children: React.ReactNode
}

function Layout({ children }: Props): React.ReactElement {
	const data = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						trackingId
					}
				}
			}
		`,
	)
	return (
		<div className="container mx-auto">
			<HtmlHead />

			<Navigation />
			<main className="flex-grow">{children}</main>
			<Footer />
			<CookieConsent
				location="bottom"
				buttonText="Accept"
				declineButtonText="Do not accept"
				cookieName="gatsby-gdpr-google-analytics"
				onAccept={() => {
					ReactGA.initialize(data.site.siteMetadata.trackingId)
				}}
			>
				To make this website work, user data is logged. By using this website,
				you agree to our Privacy Policy, including its cookie policy. See our{' '}
				<Link
					to="/privacy-policy"
					className="text-gray-300 hover:text-white underline"
				>
					Privacy policy
				</Link>{' '}
				for further information. .
			</CookieConsent>
		</div>
	)
}

export default Layout
