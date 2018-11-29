import { serverless } from '@probot/serverless-gcf'
import { whenDone } from './lib'

const probot = serverless(whenDone)

export { probot }
