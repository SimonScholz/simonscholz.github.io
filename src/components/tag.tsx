import React from 'react'
import classNames from 'classnames'

export interface TagProps {
	tagName: string
	classNameAdditions?: string
}

export const Tag = ({
	tagName,
	classNameAdditions,
}: TagProps): React.ReactElement => {
	const cls = classNames(
		classNameAdditions,
		'bg-blue-400 text-white font-bold py-1 px-2 m-1 rounded',
	)

	return (
		<>
			<p className={cls}>{tagName}</p>
		</>
	)
}
