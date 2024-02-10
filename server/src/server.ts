import 'colors'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import config from './config'
import { router } from './routes'

async function main() {
	const app = express()
	console.log(config.clientUrl)
	app.use(
		config.clientUrl
			? cors({
					credentials: true,
					origin: config.clientUrl,
			  })
			: cors()
	)
	if (!config.isProduction) app.use(morgan('dev'))
	if (config.staticPath) app.use(express.static(config.staticPath))
	app.use(express.json())
	app.use('/api', router)

	app.listen(config.port, () =>
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${config.port}`
				.yellow.bold
		)
	)
}

main().catch(console.error)
