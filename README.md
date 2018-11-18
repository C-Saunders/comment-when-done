# comment-when-done

This is GitHub App built with [Probot](https://github.com/probot/probot).

It makes comments on issues when they're _closed_ and pull requests when they're _merged_. Pull requests that are closed without being merged will not trigger the bot to make a comment.

The comment contents should be placed between an opening sentinel- `{{whendone}}` and closing sentinel- `{{/whendone}}`.
* The opening `{{whendone}}` must be at the beginning of a line
* Inline data like `{{whendone}}Tell Sam this bug is fixed{{/whendone}}` will work
* Multi-line data like this will also work
```
{{whendone}}
Set up the new alerts that require this data.

Let Pat know to adjust the dashboards.
{{/whendone}}
```

## Contributing

If you have suggestions for how this application could be improved, want to report a bug, have a question, etc., please open an issue! We love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Charlie Saunders <charlieasaunders@gmail.com>
