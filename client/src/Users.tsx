import { useEffect, useState } from 'react'

interface IUser {
	name: string
	surname: string
}

const Users = () => {
	const [data, setData] = useState<IUser[] | []>([])

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		const response = await fetch('https://localhost/api/users')

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

export default Users
