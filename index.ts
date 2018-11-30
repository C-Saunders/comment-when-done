import { Application, Context } from 'probot' // eslint-disable-line no-unused-vars
import { serverless } from '@probot/serverless-gcf'

const matcher = /^{{whendone}}([\s\S]*?){{\/whendone}}$/m

const probot = serverless(whenDone)

export { probot, whenDone }

function whenDone (app: Application) {
  app.on(['issues.closed', 'pull_request.closed'], async (context: Context) => {
    const { issue, pull_request: pr } = context.payload

    if (pr && !pr.merged) {
      return
    }

    const matches = (issue || pr).body.match(matcher)

    if (matches && matches[1]) {
      const newComment = context.issue({ body: clean(matches[1]) })
      await context.github.issues.createComment(newComment)
    }
  })
}

function clean (rawData: string): string {
  return rawData.trim().replace(/`([/@][^`]+)`/g, '$1')
}
