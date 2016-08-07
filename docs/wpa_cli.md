## Wordpress Admin CLI documenentation

### Usage

The is how the execution signature looks:

`wpa-cli [options] <command>`

### Options

wpa-cli has few options, but it's wise to know about them. By default no options are passed.
The `-p` / `--path` option is required, if it's called without it, the app will exit with an error.

- `-p`, `--path <PATH>` The path where your local Wordpress installation resides
- `-k`, `--no-color` Omit color from output
- `--debug` Show debug information
- `-v`, `--version` Display the current version
- `-h`, `--help` Display help and usage details

### Commands

These are the available commands:

- `install` Install a new wordpress instance. Takes the target folder from the `--path` option.
- `update` Updates the local wordpress instace. You specify it's location via the `--path` option.

### Example

To install a new wordpress instance into the `wordpress_new` folder you would run:

`wpa-cli install --path wordpress_new/`
