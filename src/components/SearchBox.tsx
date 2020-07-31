import React from 'react'

interface Props {
	setQuery: (event: string) => void
	resultSize: number
}

export const SearchBox = ({
	setQuery,
	resultSize,
}: Props): React.ReactElement => {
	const clear = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.keyCode === 27) {
			const target = event.target as HTMLInputElement
			target.value = ''
			setQuery('')
		}
	}
	return (
		<div className="flex items-center border-b border-gray-500 py-2 mt-3 mx-3">
			<input
				className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
				type="text"
				placeholder="Search... (ESC to clear input)"
				aria-label="Search..."
				autoFocus
				onChange={event => setQuery(event.target.value)}
				onKeyDown={clear}
			/>
			<div className="rounded-full h-6 w-6 flex items-center justify-center border-2 border-blue-500 bg-blue-500 text-white text-sm">
				{resultSize}
			</div>
		</div>
	)
}
