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

## Installation

TyFON is a singular CLI tool that runs on Node, so you need Node.js installed beforehand.
```bash
npm i -g tyfon
```

<br><br>

## Usage

### Server Side

Export your functions in `index.ts`:

```ts
export async const getMessage = name => `Hellow ${name}!`;
```

Initialize TyFON and serve:
```bash
tyfon init
```
```bash
tyfon serve
```

👉 Check it out on `localhost:8000/message?0=World`.

<br>

### Client Side

Build SDK metadata on server side:
```bash
tyfon build                      # --> run this on server side code
```

Add the SDK on client side and use it:
```bash
tyfon install localhost:8000     # --> run this on client side code
```
```ts
import { getMessage } from '@api/my-server';

getMessage('World').then(console.log);
```

👉 The name `my-server` comes from `package.json` of your server code.

<br><br>

## Conventions

TyFON leans heavily towards the _convention over configuration_ principle. It is pretty opinionated in how it wraps normal functions within
API end-points and how code should be structured, for example it picks endpoint methods based on the name of the function, or it expects
all API functions to be exported from `index.ts` from the root of the project.

<br>

### Conventions You Must Follow

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

### Conventions You Should Know

```
⚖️ Client SDK will be named @api/<server-name>,
   where <server-name> comes from package.json on server-side code.
```
```
⚖️ If two client SDKs share the same name, the one installed later overwrites the former.
```
☝️ So always pick a proper name for your server-side code when you do `npm init`.

<br>

### Function-to-Endpoint Mapping Convention

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
