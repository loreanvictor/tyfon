<p align="center">
  <img src="/tyfon-type.svg" width="320px"/>
  <p align="center"><b>Ty</b>ped <b>F</b>unctions <b>O</b>ver <b>N</b>etwork</p>
</p>

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

<br><br>

# Installation

TyFON is a singular CLI tool that runs on Node, so you need Node.js installed beforehand.
```bash
npm i -g tyfon
```

<br><br>

# Usage

## Server Side

Export your functions in `index.ts`:

```ts
export async const getMessage = name => `Hellow ${name}!`;
```

Now serve it:
```bash
tyfon serve
```

👉 Check it out on `localhost:8000/message?0=World`.

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
tyfon serve
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

It is common practice for client-code to use different API URLs for development, staging or production.
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

<br>

## Conventions You Must Follow

```
⚖️ Remote functions and only remote functions MUST be exported from index.ts
```
```
⚖️ Remote functions MUST be async or return a Promise
```
```
⚖️ Argument types and return types MUST be plain JavaScript objects
```
```
⚖️ Exported types MUST be local
   i.e. argument types and return types of exported functions
   should not depend on any dependencies.
```
☝️ This rule is more of a technical limitation right now, and might get removed later on.


<br>

## Conventions You Should Know

```
⚖️ Client SDK will be named @api/<server-name>,
   where <server-name> comes from package.json on server-side code.
```
```
⚖️ If two client SDKs share the same name, the one installed later overwrites the former.
```
☝️ So always pick a proper name for your server-side code when you do `npm init`.

<br>

## Function-to-Endpoint Mapping Convention

```
⚖️ Function's name is used to determine the URL of its corresponding endpoint
   and its HTTP method:

- getSomething()    ---> GET    /something

- addSomething()    ---> POST   /something
- createSomething() ---> POST   /something
- postSomething()   ---> POST   /something

- updateSomething() ---> PUT    /something
- setSomething()    ---> PUT    /something
- putSomething()    ---> PUT    /something

- deleteSomething() ---> DELETE /something
- removeSomething() ---> DELETE /something

- whateverElse()    ---> POST   /whateverElse
```

<br><br>

# CLI Reference

### `▶ tyfon init`

> 👉 Run this on server-side!

Initializes TyFON on server side, installing necessary dependencies.

---

<br>

### `▶ tyfon build`

> 👉 Run this on server-side!

Generates necessary network-layer code and SDK metadata. Will automatically invoke `tyfon init` if not initialized.

#### options:

`-i` or `--image`: The name/tag of the docker image to build:
```bash
tyfon build --image my-docker-image
```
If image is specified, only the docker image will be built (so no builds in local filesystem).
This option only works if [docker](https://www.docker.com) is installed.

> 💡You can use `tyfon b` as a shortcut for this command.

---

<br>

### `▶ tyfon serve`

> 👉 Run this on server-side!

Serves the built server code. Will reload the server when the code changes, and will automatically call `tyfon build` if never built before.

‼️`tyfon serve` **WILL NOT** rebuild SDK metadata when server-side code changes. You **MUST** call `tyfon build` for updating SDK metadata.

#### options:

`-p` or `--port`: Determines the port to serve on. Default is `8000`.
```bash
tyfon serve -p 3000
```
`-e` or `--env`: Allows setting environment variables for the server-side code.
```bash
tyfon serve -e ENV=dev -e UPLOAD_DIR=./uploads
```

> 💡 You can use `tyfon s` as a shortcut for this command.

---

<br>

### `▶ tyfon install <url>`

> 👉 Run this on client-side!

Will install SDK of the TyFON served on `<url>` as an NPM package. Assuming that the server-side code has `my-server` as its package name (in `package.json`),
the SDK package will be named `@api/my-server`. Will override any previous package with that name. It will also store the SDK information in local `package.json` so that all necessary TyFONs can later be installed using `tyfon i`.

#### options:

`-e` or `--env`: Marks the environment for the installed SDK. By default, `"all"` is used.
```bash
tyfon i localhost:8000 --env dev
```

> 💡 You can use `tyfon i` as a shortcut for this command.

---

<br>

### `▶ tyfon install`

> 👉 Run this on client-side!

Will install all TyFON SDKs stored in `package.json` that match given environment.
If no environment is given, only SDKs that are marked for `"all"` environments will be installed.

#### options:

`-e` or `--env`: Specifies the environment for which SDKs should be installed.
```bash
tyfon install             # --> installs all SDKs with "all" environment
```
```bash
tyfon install --env dev   # --> installs all SDKs with "all" or "dev" environment
```

> 💡 You can use `tyfon i` as a shortcut for this command.

---

<br>

### `▶ tyfon uninstall <url|package-name>`

> 👉 Run this on client-side!

Will uninstall the TyFON SDK corresponding to given URL or package name.

```bash
tyfon uninstall localhost:8000
```
```bash
tyfon uninstall @api/my-server
```

---

<br>

### `▶ tyfon version`

Displayes the installed version of the CLI, alongside the latest version on NPM.

> 💡 You can use `tyfon v` as a shortcut for this command.

---

<br>

### `▶ tyfon help`

Displays available commands and a short summary of what each would do. You can also pass it an argument
to see more information about each command:

```bash
tyfon help
```
```bash
tyfon help serve
```

> 💡 You can use `tyfon h` as a shortcut for this command.

<br><br>
