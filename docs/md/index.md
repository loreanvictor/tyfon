> :DarkLight
> > :InDark
> >
> > ![logo](/docs/assets/tyfon-banner-dark.svg)
>
> > :InLight
> >
> > ![logo](/docs/assets/tyfon-banner.svg)

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

---

# Getting Started

To get a feeling of how TyFON works, lets create a simple server and client. You need
[Node.js](https://nodejs.org/en/) installed before you can proceed.

<br>

## 👉 Install TyFON
```bash
npm i -g tyfon
```

<br>

## 👉 Setup a Server
Create a folder for your server code.
```bash
mkdir my-tyfon-server
cd my-tyfon-server
```

Create `package.json`:
```json
{
  "name": "my-tyfon-server"
}
```

Create `index.ts`:
```ts
export const getMessage = async name => `Hellow ${name}!`;
```

Serve it:
```bash
tyfon serve
```

> 🚀 Check it out on http://localhost:8000/message?0=World

<br><br>

## 👉 Setup a Client
In a new terminal, create a folder for your client code (keep the server running):

```bash
mkdir my-tyfon-client
cd my-tyfon-client
npm i -g ts-node
npm init
```

Install your server's SDK:
```bash
tyfon i localhost:8000
```

Create `index.ts`:

```ts
import { getMessage } from '@api/my-tyfon-server';

getMessage('World').then(console.log);
```

Run it:
```bash
ts-node .
> Hellow World!
```

> :ToCPrevNext