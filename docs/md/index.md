> :DarkLight
> > :InDark
> >
> > ![logo](/tyfon-banner-dark.svg)
>
> > :InLight
> >
> > ![logo](/tyfon-banner.svg)

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

To get a feeling of how TyFON works, lets create a simple server and client:

<br>

👉 **STEP 1**\
Install TyFON CLI.
```bash
npm i -g tyfon
```

<br>

👉 **STEP 2**\
 Create a folder for your server code.
```bash
mkdir my-tyfon-server
cd my-tyfon-server
```
Create `package.json`:
```json | my-tyfon-server/package.json
{
  "name": "my-tyfon-server"
}
```
Create `index.ts`:
```ts | my-tyfon-server/index.ts
// this is all you need for your server-side code 😎😎
export const getMessage = async name => `Hellow ${name}!`;
```
Serve it:
```bash
tyfon serve
```

> :ToCPrevNext