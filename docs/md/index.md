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

## Install TyFON
```bash
npm i -g tyfon
```

<br>

## Setup a Server
👉 Create a folder for your server code.
```bash
mkdir my-tyfon-server
cd my-tyfon-server
```

👉 Create `package.json`:
```json
{
  "name": "my-tyfon-server"
}
```

👉 Create `index.ts`:
```ts
export const getMessage = async name => `Hellow ${name}!`;
```

🚀 Serve it:
```bash
tyfon serve
```

> Check it out on http://localhost:8000/message?0=World

<br><br>

## Setup a Client
👉 In a new terminal, create a folder for your client code (keep the server running):

```bash
mkdir my-tyfon-client
cd my-tyfon-client
npm i -g ts-node             # --> To run TypeScript. You can also skip this and run JavaScript.
npm init
```

👉 Install your server's SDK:
```bash
tyfon i localhost:8000
```

👉 Create `index.ts`:

```ts
import { getMessage } from '@api/my-tyfon-server';

getMessage('World').then(console.log);
```

🚀 Run it:
```bash
ts-node .
> Hellow World!
```

---

# Conventions

TyFON operates heavily on _convention over configuration_ principles. There are conventions it
uses under the hood for consistent server-client communication, and there are conventions you would
need to follow. For example, function names will determine the endpoint URL and method (under the hood convention),
and your remote functions must always be exported from `index.ts`.

> :Buttons
> > :Button label=Learn More About TyFON Conventions, url=/conventions

---

# CLI Commands

## Server-Side

- [tyfon init](/cli/init)\
  Initializes TyFON

- [tyfon build](/cli/build)\
  Builds network layer code and SDK metadata. Also can be used to build production Docker images.

- [tyfon serve](/cli/serve)\
  Serves the functions exported from `index.ts` over network.

## Client-Side

- [tyfon install](/cli/install)\
  Installs SDK of a TyFON server, or installs/updates all required SDKs specified in `package.json`.

- [tyfon uninstall](/cli/uninstall)\
  Uninstalls a particular SDK.

## Generic

- [tyfon help](/cli/help)
- [tyfon version](/cli/version)

---

# Under the Hood

On server-side, TyFON simply injects necessary networking code and runs a Node server. It also
compiles the TypeScript code and bundles the type definitions into SDK metadata.

On client-side, the CLI requests that SDK metadata from the server. It then generates a local
package from that metadata, using same type definitions as the exported server code, and auto-generating
necessary networking code. Client SDK's network layer is isomorphic, so you can use it on other Node instances
as well as in browsers.

<br><br>

> :ToCPrevNext