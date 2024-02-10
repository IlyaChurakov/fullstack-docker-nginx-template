interface IUser {
	name: string
	surname: string
}

interface Data {
	data: IUser[]
}

class ExampleService {
	async getUsers(): Promise<Data> {
		return {
			data: [
				{ name: 'Ivan', surname: 'Ivanov' },
				{ name: 'Petr', surname: 'Petrov' },
			],
		}
	}
}

export default new ExampleService()
