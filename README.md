# Croton

> Toxic to cats and dogs.


## Monorepo
This is a monorepo for a `web/mobile/server` development, intending to share as much dependencies and code as possible. Dependencies reside in the root level `node_modules`. Individual packages reside in the `packages` directory:

```js
/node_modules    // dependecies shared by the packages
/packages
  /web           // web code [React]
  /mobile        // mobile code [React Native]
  /server        // server code [Node]
  /core          // logic to be shared between web/mobile/server
```

## Install
Install the dependencies, running `yarn` from the root directory:
```
[/]> yarn
```

If you need to add a dependency to a package, run `yarn add` in the package directory:
```
[/packages/web]> yarn add redux
```

## Run
Use root or package level commands to run web:
```
[/] yarn workspace web start

[/packages/web] yarn start
```

Use root or package level commands to run mobile:
```
[/] yarn workspace mobile start:android

[/packages/mobile] yarn start:android
```
