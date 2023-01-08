import React from 'react'

interface Props {
	children: any
}

export const FlexInitialXlBlock: React.FunctionComponent<Props> = ({
	children,
}) => {
	return (
		<>
			<div className="flex-initial w-64 hidden xl:block">{children}</div>
		</>
	)
}
