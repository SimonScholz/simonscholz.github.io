import React from 'react'

interface Props {
	timeFrame: any
}

export const XlHiddenTimeFrame: React.FunctionComponent<Props> = ({
	timeFrame,
}) => {
	return (
		<>
			<div className="xl:hidden mb-1">
				<span className="text-gray-600">{timeFrame}</span>
			</div>
		</>
	)
}
