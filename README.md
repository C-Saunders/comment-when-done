# comment-when-done

This is GitHub App built with [Probot](https://github.com/probot/probot).

It makes comments on issues when they're _closed_ and pull requests when they're _merged_. Pull requests that are closed without being merged will not trigger the bot to make a comment.

## Usage

The comment contents should be placed between an opening sentinel- `{{whendone}}` and closing sentinel- `{{/whendone}}`.
* The opening `{{whendone}}` must be at the beginning of a line
* Single line commands like this will work
```
{{whendone}}Tell Sam this bug is fixed{{/whendone}}
```
* Multi-line commands like this will also work
```
{{whendone}}
Set up the new alerts.
Let Pat know they should adjust the dashboards.
{{/whendone}}
```
* You can "escape" slash commands (e.g. from [the Probot reminder app](https://github.com/probot/reminders)) and @mentions by wrapping them in backticks
```
{{whendone}}
`/remind` me to set up the new alerts in two weeks.
Let `@this-is-pat` know they should adjust the dashboards.
`/remind` @another-person to stretch 20 minutes.
{{/whendone}}
```

## Running your own instance as a [Google Cloud Function](https://cloud.google.com/functions/)

You can run this anywhere or any way you want, but it is set up to make a GCP deployment (hopefully) easy using the [serverless framework](https://serverless.com/).

You will need to have `node` and `npm` installed.
```sh
git clone git@github.com:C-Saunders/comment-when-done.git
cd comment-when-done
npm install
npm run start
```

`npm run start` will facilitate the authorization flow that results from `probot run` and guide you to set up a GitHub app. It will create and populate a local .env file containing the secrets you'll need to be available as environment variables when the bot runs.

The secrets in the .env file will be read by `serverless` when you deploy.

Follow the instructions [provided by serverless](https://serverless.com/framework/docs/providers/google/guide/quick-start#2-set-up-the-credentials) to set up your GCP credentials. Save your credentials JSON file in `~/.gcloud/comment-when-done.json` (or update this path in serverless.yml to meet your needs).

```
npm install -g serverless
serverless deploy
```

## Contributing

If you have suggestions for how this application could be improved, want to report a bug, have a question, etc., please open an issue! We love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Charlie Saunders <charlieasaunders@gmail.com>
