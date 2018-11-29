import nock from 'nock'
import { Probot } from 'probot'
import { whenDone } from '../lib'

const failTest = () => expect(true).toBeFalsy()

nock.disableNetConnect()

describe('When issues are closed', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({})
    const app = probot.load(whenDone)
    app.app = () => 'test'
  })

  test('it creates a comment with the data enclosed in the whendone markers', async () => {
    nock('https://api.github.com')
      .post('/app/installations/461842/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/C-Saunders/flynn_env_test/issues/1/comments', (body: any) => {
        expect(body).toMatchObject({ body: 'Inline whendone content' })
        return true
      })
      .reply(200)

    await probot.receive({ name: 'issues', payload: require('./fixtures/issues.closed.json') })
  })

  test('it removes the `backticks` wrapping slash commands and @mentions, but leaves others intact', async () => {
    nock('https://api.github.com')
      .post('/app/installations/461842/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/C-Saunders/flynn_env_test/issues/1/comments', (body: any) => {
        expect(body).toMatchObject({ body: '/remind me to do the dishes\r\nTell @somebody the water is boiling\r\n/tell @steve-stevenson the banans are `ripe`' })
        return true
      })
      .reply(200)

    await probot.receive({ name: 'issues', payload: require('./fixtures/issues.closed_escape_seq.json') })
  })
})

describe('When pull requests are merged', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({})
    const app = probot.load(whenDone)
    app.app = () => 'test'
  })

  test('it creates a comment with the data enclosed in the whendone markers', async () => {
    nock('https://api.github.com')
      .post('/app/installations/461842/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/C-Saunders/flynn_env_test/issues/2/comments', (body: any) => {
        expect(body).toMatchObject({ body: 'Comment that is\r\nspanning multiple lines' })
        return true
      })
      .reply(200)

    await probot.receive({ name: 'pull_request', payload: require('./fixtures/pull_requests.merged.json') })
  })
})

describe('When pull requests are closed', () => {
  let probot: any

  beforeEach(() => {
    probot = new Probot({})
    const app = probot.load(whenDone)
    app.app = () => 'test'
  })

  test('it does not make a comment', async () => {
    nock('https://api.github.com')
      .post('/app/installations/461842/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .post('/repos/C-Saunders/flynn_env_test/pulls/3/comments', () => {
        failTest()
        return true
      })
      .reply(200)

    await probot.receive({ name: 'pull_request', payload: require('./fixtures/pull_requests.closed.json') })
  })
})
