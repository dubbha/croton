
|Build|@dev|@stage|@prod|
|-|:-:|:-:|:-:|
|web|![dev@aws](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidVcrTGg4WC9HUVVSM3ZvejZDVk5FS0k3TEdmYm02OXBidTZ5VUR2WDNjamtnWE5BWVl2MjlmR2NlczN3SnFpWHhOVDVObjllbjNaM1JNbzdTWlVGVWhZPSIsIml2UGFyYW1ldGVyU3BlYyI6IkJzQUlyZS9pVkhPSVJDZlciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=dev)|![stage@aws](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidVcrTGg4WC9HUVVSM3ZvejZDVk5FS0k3TEdmYm02OXBidTZ5VUR2WDNjamtnWE5BWVl2MjlmR2NlczN3SnFpWHhOVDVObjllbjNaM1JNbzdTWlVGVWhZPSIsIml2UGFyYW1ldGVyU3BlYyI6IkJzQUlyZS9pVkhPSVJDZlciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=stage)|![prod@aws](https://codebuild.eu-west-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidVcrTGg4WC9HUVVSM3ZvejZDVk5FS0k3TEdmYm02OXBidTZ5VUR2WDNjamtnWE5BWVl2MjlmR2NlczN3SnFpWHhOVDVObjllbjNaM1JNbzdTWlVGVWhZPSIsIml2UGFyYW1ldGVyU3BlYyI6IkJzQUlyZS9pVkhPSVJDZlciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=prod)|

![dev@github](https://github.com/dubbha/croton/workflows/WEB-CI-common/badge.svg?branch=dev)

![lines](http://croton.cf:8080/coverage/badge-lines.svg) ![functions](http://croton.cf:8080/coverage/badge-functions.svg) ![branches](http://croton.cf:8080/coverage/badge-branches.svg) ![statements](http://croton.cf:8080/coverage/badge-statements.svg)


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
Use root or package level commands to run specific package, e.g. web:
```
[/] yarn workspace web start

[/packages/web] yarn start
```
You should add your `google-services.json` from firebase configs to '[/packages/mobile/android/app].
Also you should install gradlew dependencies.
```
[/packages/mobile/android] ./gradlew build
```
Use root or package level commands to run mobile:
```
[/] yarn workspace mobile android
```
You can run iOS simulator only on macOS.
You should add `GoogleService-Info.plist` from firebase configs to '[/packages/mobile/ios] and make link on it in the Xcode.
Also you should install dependencies for Swift/Objective-C for run iOS emulator.
```
[/packages/mobile/ios] pod install
```
Also if you use Xcode v12.0 and have bug with local images in simulator, you should make fix changes.
```
[/] yarn add patch-package postinstall-postinstall
[/] yarn patch-package     
```
Use root or package level commands to run mobile:
```
[/] yarn workspace mobile ios

```
If you would like to start android simulator on macOS you should give permission for:
```
[/] chmod 755 packages/mobile/android/gradlew
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
If you'd like to contribute, please follow these [recommendations](CONTRIBUTING.md).

## License
[MIT License](https://opensource.org/licenses/MIT)
