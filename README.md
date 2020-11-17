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

► Export your functions in `index.ts`:

```ts
export async const getMessage = name => `Hellow ${name}!`;
```

► Initialize TyFON and serve:
```bash
tyfon init
```
```bash
tyfon serve
```

👉 Check it out on `localhost:8000/message?0=World`.

<br>

### Client Side

► Build SDK metadata on server side:
```bash
tyfon build                      # --> run this on server side code
```

► Add the SDK on client side and use it:
```bash
tyfon install localhost:8000     # --> run this on client side code
```
```ts
import { getMessage } from '@api/my-server';

getMessage('World').then(console.log);
```

<br><br>

## Conventions

TyFON aligns heavily towards _convention over configuration_ mantra. You need to follow these rules for TyFON to work properly:

- Remote functions **MUST** be exported from `index.ts`
- Remote functions **MUST** be `async`
- Argument types and return types **MUST** be plain JavaScript objects

Additionally, TyFON follows these conventions:

- Applicable HTTP methods are deduced based on function name:
- `getX()` will be bound to `GET /x`
- `updateX()`, `setX()` and `putX()` will be bound to `PUT /x`
- `deleteX()` and `removeX()` will be bound to `DELETE /x`
- `postX()`, `addX()`, `createX()` and `x()` will be bound to `POST /x`

- Package name (in `package.json`) on server-side code is used as client-side SDK package name `@api/<package-name>`
- SDKs of the same server name (same package name) _will override_ each other

<br>

> ⚠️⚠️**IMPORTANT**⚠️⚠️
>
> Exported types also **MUST** be local, i.e. you should not export types from dependencies, neither should
> the types used in exported functions be dependent on types from dependencies.
>
> However, this is more of a technical limitation right now, and might be removed later on (or might become a standard convention).
