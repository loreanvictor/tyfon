<div align="center">
  <img src="/tyfon-type.svg" width="320px"/>
  <div><b>Ty</b>ped <b>F</b>unctions <b>O</b>ver <b>N</b>etwork</div>
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

<br><br>

## Installation

TyFON is a singular CLI tool that runs on Node, so you need Node.js installed beforehand.
```bash
npm i -g tyfon
```

<br><br>

## Usage

### Server Side

👉 Export your functions in `index.ts`:

```ts
export async const getMessage = name => `Hellow ${name}!`;
```

👉 Initialize TyFON:
```bash
tyfon init
```

👉 Serve your API:
```bash
tyfon serve
```

👀 Check it out on `localhost:8000/message?0=World.

<br>

### Client Side

👉 Add the SDK:

```bash
tyfon install localhost:8000
```

👉 Now use the functions:

```ts
import { getMessage } from '@api/backend';

getMsg('World').then(console.log);
```
