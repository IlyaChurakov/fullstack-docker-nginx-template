import express from 'express'
import exampleRoutes from '../example/example.routes'

export const router = express.Router()

router.use('/users', exampleRoutes)
