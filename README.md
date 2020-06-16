# Croton

> Toxic to cats and dogs.

Croton is an app to help you take care of your plants.

## Getting Started
### Install
Install the dependencies, running `yarn` from the root directory:
```
[/]> yarn
``` 
##### *Notice: you'll need `yarn` before start. If you haven't it already, follow the instructions [here](https://yarnpkg.com/getting-started/install).*

If you need to add a dependency to a package, run `yarn add` in the package directory:
```
[/packages/web]> yarn add redux
```

### Run
Use root or package level commands to run specific package:
```
[/] yarn workspace web start

[/packages/web] yarn start
```
Use root or package level commands to run mobile:
```
[/] yarn workspace mobile start:android

[/packages/mobile] yarn start:android
```

### Monorepo
This is a monorepo for a `web/mobile/server` development, intending to share as much dependencies and code as possible. Dependencies reside in the root level `node_modules`. Individual packages reside in the `packages` directory:

```js
/node_modules    // dependecies shared by the packages
/packages
  /web           // web code [React]
  /mobile        // mobile code [React Native]
  /server        // server code [Node]
  /core          // logic to be shared between web/mobile/server
```

## Contributing
If you'd like to contribute, please follow this [recommendations](CONTRIBUTING.md).

## License
[MIT License](https://opensource.org/licenses/MIT)
