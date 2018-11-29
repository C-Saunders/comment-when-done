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
* You can "escape" slash commands (e.g. from [the Probot reminer app](https://github.com/probot/reminders)) and @mentions by wrapping them in backticks
```
{{whendone}}
`/remind` me to set up the new alerts in two weeks.
Let `@this-is-pat` know they should adjust the dashboards.
`/remind` @another-person to stretch 20 minutes.
{{/whendone}}
```

## Deploy your own!

1. `git clone`
1. `npm install`
1. `npm run start`
1. https://serverless.com/framework/docs/providers/google/guide/quick-start/

## Contributing

If you have suggestions for how this application could be improved, want to report a bug, have a question, etc., please open an issue! We love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Charlie Saunders <charlieasaunders@gmail.com>
