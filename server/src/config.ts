import dotenv from 'dotenv'
import { join, resolve } from 'path'
import { env } from 'process'

export interface Config {
	db: string
	port: string
	clientUrl?: string
	staticPath?: string
	isProduction: boolean
}

function getConfig(): Config {
	dotenv.config()

	const staticPath = resolve(join(__dirname, '/static'))

	return Object.freeze({
		db: env.DB || 'sqlite://database.db',
		port: env.PORT || '5001',
		clientUrl: env.CLIENT_URL,
		staticPath: env.SERVE_STATIC || staticPath,
		isProduction: env.NODE_ENV === 'production' ? true : false,
	})
}

export default getConfig()
