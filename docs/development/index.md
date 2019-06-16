# hyperglass Development

Hyperglass is maintained as a [Github project](https://github.com/checktheroads/hyperglass) under the BSD 3-Clause Clear License. Hyperglass users are encouraged to submit Github issues for feature requests and bug reports.

## License

The intent behind the the [BSD 3-Clause Clear License](https://choosealicense.com/licenses/bsd-3-clause-clear/) is to ensure that anyone can use or modify Hyperglass in any way they wish, as long as credit and copyright notice is provied. If you have any questions about this, or wish to request any special permissions, please contact [matt@allroads.io](mailto:matt@allroads.io).

## Structure

Under the main `hyperglass/hyperglass/` directory, the following basic structure is in place:

```
hyperglass/
├── __init__.py
├── command/
├── configuration/
├── gunicorn_config.py
├── hyperglass.py
├── manage.py
├── render/
├── static/
└── wsgi.py
```

### Scripts

#### `hyperglass.py`

Main Flask application. Passes input to the `command.execute` module.

#### `manage.py`

Management script for perfoming one-off actions. For now, the only action implemented is a manual clearing of the Flask-cache cache. To clear the cache, run `python3 manage.py --clearcache`.

### Directories

#### command/

```
hyperglass/command/
├── __init__.py
├── construct.py
├── execute.py
└── parse.py
```

##### `execute.py`

Matches router name to router IP, OS, and credentials. Passes data to `cmd_construct.py`, uses the results to execute the Netmiko action. Also performs error handling in the event of a [blacklist](/configuration/blacklist) match.

##### `construct.py`

Constructs full commands to run on routers from `hyperglass/hyperglass/config/commands.toml`. Also performs error handling in the event of input errors.

##### `parser.py`

Parses output before presentation to the user. For the time being, only BGP output from Cisco IOS is parsed. This is because for BGP Community and AS_PATH lookups, Cisco IOS returns results for *all* address families, including VPNv4. This script ensures that only IPv4 and IPv6 address family output is returned.

#### configuration/

The `configuration/` directory contains all TOML config files used by Hyperglass:

```
hyperglass/configuration/
├── __init__.py
├── blacklist.toml
├── commands.toml
├── config.toml
├── devices.toml
└── requires_ipv6_cidr.toml
```

As a module, `configuration` imports configuration from TOML configuration files, defines default values, and exports each as a variable that can be called in other scripts.

#### static/

The `static/` directory contains all static HTML/CSS/JS files used for serving the site:

```
hyperglass/static/
├── css/
│   ├── hyperglass.css
│   └── icofont
├── images/
│   ├── brand.svg
│   ├── favicon
│   ├── hyperglass-dark.png
│   └── hyperglass-light.png
├── js/
│   ├── hyperglass.js
│   ├── jquery-3.4.0.min.js
│   └── jquery-3.4.0.min.map
└── sass/
    ├── base
    ├── components
    ├── custom
    ├── elements
    ├── grid
    ├── hyperglass.scss
    ├── layout
    └── utilities
```

- `css/hyperglass.css` Final CSS file compiled from Sass file `hyperglass.scss`. Sass compiles all the `.sass` files located under `sass/` and combines them into a single CSS file.
- `css/icofont/` Completely free alternative to FontAwesome - [Icofont](https://icofont.com/).
- `js/hyerpglass.js` Basic Javascript helper to perform AJAX queries necessary to pull in dynamic information and render content.

#### render/

The `render/` directory contains the `render` module, which renders HTML and Sass templates, compiles Sass to CSS.

```
hyperglass/render/
├── __init__.py
└── templates/
    ├── 415.html
    ├── 429.html
    ├── base.html
    ├── footer.html
    ├── footer.md
    ├── hyperglass.scss
    └── index.html
```

`render/templates/` contains the Jinja2 templates themselves:

- `415.html` General error page template.
- `429.html` Site load rate limit page.
- `base.html` Base template inherited by all other templates. Contains HTML `head`, JavaScript, etc.
- `footer.html` Footer template containing footer text and hyperglass credit link.
- `footer.md` Text that appears in the footer, if enabled. Markdown will be rendered as HTML.
- `hyperglass.scss` Generates SCSS file for Bulma and local customizations.
- `index.html` Main page template.
