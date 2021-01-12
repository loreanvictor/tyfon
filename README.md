<div align="center">
  <img src="/tyfon-type.svg" width="320px"/>
  <p align="center"><b>Ty</b>ped <b>F</b>unctions <b>O</b>ver <b>N</b>etwork</p>

  [![version](https://img.shields.io/npm/v/tyfon?logo=npm&style=flat-square)](https://www.npmjs.com/package/tyfon)

</div>

<br><br>

TyFON is a zero-config RPC for TypeScript. It automatically creates all required networking code on the server-side and generates client-side SDK using same type definitions for client-server consistency.

```ts
// server:

export async function getMessage(name: string) {
  return `Hellow ${name}!`;
}
```
```ts
// client:

import { getMessage } from '@api/my-server';

getMessage('World').then(console.log):
```

👉 [Read the docs](https://loreanvictor.github.io/tyfon).

<br><br>

# Installation

TyFON is a singular CLI tool that runs on Node, so you need Node.js installed beforehand.
```bash
npm i -g tyfon
```

<br><br>

# Usage

[Read the docs](https://loreanvictor.github.io/tyfon) for detailed usage information and
a getting-started tutorial.

## Server Side

Export your functions in `index.ts`:

```ts
export async const getMessage = name => `Hellow ${name}!`;
```

Now serve it:
```bash
tyfon serve
```

👉 Check it out on `localhost:8000/message?0="World"`.

<br>

## Client Side

Add the SDK on client side and use it:
```bash
tyfon i localhost:8000
```
```ts
import { getMessage } from '@api/my-server';

getMessage('World').then(console.log);
```

👉 The name `my-server` comes from `package.json` of your server code.

<br>

## Syncing Updates

On server-side code, rebuild client SDK metadata and serve it again:
```bash
tyfon build                      # --> run this on server side code
```
```bash
tyfon serve                      # --> run this on server side code
```

On client-side code, update TyFONs you are using:
```bash
tyfon i                          # --> run this on client side code
```

<br>

## Server Environment Variables

You can pass environment variables to `typhon serve` command using `-e` option:

```bash
typhon serve -e ENV=dev -e LOGS=verbose
```

<br>

## Client Environments

It is common practice for client-code to use different API URLs for different environments (i.e. development, production, staging, etc).
You can use the `--env` flag on `typhon i` command to mark the environment a TyFON should be used in:
```bash
tyfon i https://my-server.cloud --env production
tyfon i https://staging.my-server.cloud --env staging
tyfon i localhost:8000 --env dev
```

Now for building client-code in production, use the following command:
```bash
tyfon i --env production        # --> this will install all generic TyFONs and all production TyFONs
```

<br>

## Deploying

Run your TyFON in production mode:

```bash
tyfon serve --mode prod
```

### Docker

Build a docker image and deploy it:

```bash
tyfon build --image my-server

docker tag my-server https://my-registry.cloud/my-server
docker push my-server
```

👉 [docker](https://www.docker.com) **MUST** be installed for using this option.

<br><br>

# Conventions

TyFON leans heavily towards the _convention over configuration_ principle. It is pretty opinionated in how it wraps normal functions within
API end-points and how code should be structured, for example it picks endpoint methods based on the name of the function, or it expects
all API functions to be exported from `index.ts` from the root of the project.

👉 [Read the docs](https://loreanvictor.github.io/tyfon).

<br><br>

# CLI Commands

- [`tyfon init`](https://loreanvictor.github.io/tyfon/cli/init)
- [`tyfon build`](https://loreanvictor.github.io/tyfon/cli/build)
- [`tyfon serve`](https://loreanvictor.github.io/tyfon/cli/serve)
- [`tyfon install`](https://loreanvictor.github.io/tyfon/cli/install)
- [`tyfon uninstall`](https://loreanvictor.github.io/tyfon/cli/uninstall)
- [`tyfon help`](https://loreanvictor.github.io/tyfon/cli/help)
- [`tyfon version`](https://loreanvictor.github.io/tyfon/cli/version)

<br><br>
