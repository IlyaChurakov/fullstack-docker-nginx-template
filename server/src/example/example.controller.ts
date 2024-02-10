import { Request, Response } from 'express'
import ExampleService from './Example.service'

export const exampleController = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const users = await ExampleService.getUsers()
		res.json(users)
	} catch (e) {
		const { message } = e as Error
		res.status(500).json({ message })
	}
}
