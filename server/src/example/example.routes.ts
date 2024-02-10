import express from 'express'

import { exampleController } from './example.controller'

const router = express.Router()

router.route('/').get(exampleController)

export default router
