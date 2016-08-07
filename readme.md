# Wordpress Admin CLI

![logo](assets/wpa-cli-logo_v1.png)

NPM command-line utility to administer Wordpress installations.

The idea of it is to not fiddle with wordpres versions  / updates, and just focus on writing your code. This should be easy to integrate in either a `npm script` or a runner `task` (`gulp`, `grunt`).

At the moment it only features an instal and update function, which will get your installation to the latest stable version, but the plan is to also change versions, deploy your wordpress files with ease.

Check the [roadmap](readme.md#roadmap--todo) for more information.

## How to use

Install it, either locally:
```
npm install --save wpa-cli
```
or globally:
```
npm install --global wpa-cli
```
Run it with the `--path` option to give it the location of your current or desired wordpress install.

*Example (assuming your installation is located in the wordpress subfolder):*
```
wpa-cli update --path wordpress/
```
*Example (assuming you want to install a new version in `wordpress_new`):*
```
wpa-cli install --path wordpress_new/
```


Another usual use case is to create a `npm script` which will call it directly (`package.json`):
```
"scripts": {
  "update": "wpa-cli update --path wordpress/"
},
```

## Under the hood

This relies on the [Wordpress organization's Github](https://github.com/WordPress) [Wordpress project repository](https://github.com/WordPress/WordPress) for all it's actions.

It takes it's versions from the [published tags](https://api.github.com/repos/Wordpress/Wordpress/tags), and the files from the releases tarballs.

This is kind of a risky move because if [Github](https://github.com) goes down this app will not be able to function anymore.

### Warning

The way the install and update works, is to overwrite the default files with the new version (just like the Wordpress engine with `wp-update-core.php`), so if you made modifications the engine, if you run the update, **they will be overwritten**

## Known issues

If something doesn't work as you expect, look over the [known issues](https://github.com/rdig/wpa-cli/issues?q=label%3Aknown-issue) to see if it wasn't already reported, and fix/patch discovered.

## CLI

wpa-cli has few options, but it's wise to know about them. By default no options are passed.

The `-p` / `--path` option is required, *(If it's called without it, the app will exit with an error)*.

- `-p`, `--path <PATH>` The path where your local Wordpress installation resides
- `-k`, `--no-color` Omit color from output
- `--debug` Show debug information
- `-v`, `--version` Display the current version
- `-h`, `--help` Display help and usage details

There are two commands that are available: *(If there isn't one specified the all will display the `--help` message)*
- `install` Install a new wordpress instance. Takes the target folder from the `--path` option.
- `update` Updates the local wordpress instace. You specify it's location via the `--path` option.

**Example:** `wpa-cli install --path wordpress_new/` to install a new instance of wordpress into the `wordpress_new` folder.

## Name change

You may have known this app as `wordpress-update-cli` but since the feature scope change it was renamed to reflect this.

## Roadmap / Todo

- [x] ~~Install a new wordpress instance~~
- [ ] Deploy a new database
- [ ] Generate a `wp-config.php` file
- [ ] Set file / folders permissions
- [ ] Update external plugins
- [ ] Git commit after update
- [ ] Change current installation version
- [ ] Change the current installed plugin(s) version(s)
- [ ] Programatic API
- [x] ~~Update the local wordpress install to the latest version~~

## Contributing

**We welcome contributors to the the project.**

Please take a look at [contributing.md](contributing.md) on how to get started.

## License

This project is licensed under the MIT license. You can [read it here](./license.md) or learn more [about it here](http://choosealicense.com/licenses/mit/).

### Additional licenses

This project makes use of additional libraries and packages, each with it's own license and copyright.
