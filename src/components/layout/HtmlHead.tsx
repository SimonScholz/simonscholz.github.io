import React from 'react'
import Helmet from 'react-helmet'
import favicon from '../../assets/img/favicon.ico'

export function HtmlHead(): React.ReactElement {
	return (
		<Helmet>
			<html lang="en-US" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
			/>
			<link rel="shortcut icon" href={favicon} type="image/x-icon" />
			<link
				rel="apple-touch-icon-precomposed"
				href={``} // insert 152×152 png here
			/>
		</Helmet>
	)
}
