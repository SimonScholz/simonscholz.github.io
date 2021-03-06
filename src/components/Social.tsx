import React from 'react'

export interface SocialProps {
	github: string
	twitter: string
	youtube: string
}

export const Social = ({
	github,
	twitter,
	youtube,
}: SocialProps): React.ReactElement => {
	return (
		<>
			<div>
				<a
					className="block flex items-center text-gray-200 hover:text-white mr-5"
					href={github}
				>
					<svg
						className="fill-current w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<title>GitHub</title>
						<path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"></path>
					</svg>
				</a>
			</div>
			<div>
				<a
					className="block flex items-center text-gray-200 hover:text-white mr-5"
					href={twitter}
				>
					<svg
						className="fill-current w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<title>Twitter</title>
						<path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"></path>
					</svg>
				</a>
			</div>
			<div>
				<a
					className="block flex items-center text-gray-200 hover:text-white mr-2"
					href={youtube}
				>
					<svg
						className="fill-current w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						version="1"
						viewBox="0 0 32 32"
						xmlSpace="preserve"
					>
						<title>YouTube</title>
						<path d="M31.67 9.179s-.312-2.353-1.271-3.389c-1.217-1.358-2.58-1.366-3.205-1.443C22.717 4 16.002 4 16.002 4h-.015s-6.715 0-11.191.347c-.625.077-1.987.085-3.205 1.443C.633 6.826.32 9.179.32 9.179S0 11.94 0 14.701v2.588c0 2.763.32 5.523.32 5.523s.312 2.352 1.271 3.386c1.218 1.358 2.815 1.317 3.527 1.459 2.559.262 10.877.343 10.877.343s6.722-.012 11.199-.355c.625-.08 1.988-.088 3.205-1.446.958-1.034 1.271-3.386 1.271-3.386s.32-2.761.32-5.523v-2.588c0-2.762-.32-5.523-.32-5.523z"></path>
						<path fill="#4299e1" d="M12 10L12 22 22 16z"></path>
					</svg>
				</a>
			</div>
		</>
	)
}
