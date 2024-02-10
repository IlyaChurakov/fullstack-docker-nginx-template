import { useEffect, useState } from 'react'

interface IUser {
	name: string
	surname: string
}

function App() {
	const [data, setData] = useState<IUser[] | []>([])

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		const response = await fetch('http://localhost/api/users')

		const { data }: { data: IUser[] } = await response.json()

		setData(data)
	}

	return (
		<div>
			{data.map((user, index) => (
				<div key={index}>{`${user.name} ${user.surname}`}</div>
			))}
		</div>
	)
}

export default App
