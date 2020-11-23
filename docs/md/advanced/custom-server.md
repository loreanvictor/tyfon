# Custom Server

<br><br>

You can create custom TyFON servers using `tyfon-server` package. It allows
you to either create independent [express apps](https://expressjs.com/) for serving
some functions or create express routers that can be mounted on already existing node applications.

In this post, we will create an independent node app and use `tyfon-serve` to
mount some functions on it.

---

## Step 1: Setup

Lets create a folder for our server code:

```bash
mkdir my-tyfon-server
cd my-tyfon-server
npm init
```

<br>

Now lets install some dependencies. `tyfon-server` works with [express](https://expressjs.com/) only,
and it is highly recommended to use it alongside [cors](https://expressjs.com/en/resources/middleware/cors.html)
and [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html) middlewares:

```bash
npm i tyfon-server express cors body-parser
npm i typescript ts-node ts-node-dev @types/express @types/cors @types/body-parser --save-dev
```

<br>

Lets configure our NPM scripts in `package.json` to easily run the server:

```json | package.json
{
  ...
  "scripts": {
/*+*/    "start": "ts-node-dev .",
  },
  ...
}
```

<br>

Finally, lets configure TypeScript for our project in `tsconfig.json`:

```json | tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "declaration": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "lib": [
      "es2017",
      "dom"
    ]
  },
  "include": [
    "../../*",
    "../../**/*"
  ]
}
```
> :Buttons
> > :CopyButton

---

## Step 2: Create the App

First, lets create the main node app in `index.ts`:

```ts | index.ts
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();
app.use(cors());
app.use(json());
app.get('/ping', (_, res) => res.status(200).send('It Works!'));

app.listen(4000);
```

<br>

👉 Run the code and check it on http://localhost:4000/ping
```bash
npm start
```

---

## Step 3: Create the Function(s)

Lets create a folder for our functions, named `funcs`, and put our remote function
inside it in `funcs/index.ts` as follows:

```ts | funcs/index.ts
export async function getMessage(name: string) {
  return `Servus ${name}!`;
}
```

---

## Step 4: Mount the Function(s)

Lets import the functions in `funcs` folder and mount them on our node app:

```ts | index.ts
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

/*+*/ import { router } from 'tyfon-server';
/*+*/ import * as funcs from './funcs';

const app = express();
app.use(cors());
app.use(json());
app.get('/ping', (_, res) => res.status(200).send('It Works!'));

/*+*/ app.use('/funcs', router(funcs));

app.listen(4000);
```

<br>

👉 Check it out on http://localhost:4000/funcs/message?0=World

---

## Step 5: SDK Metadata

While our remote function is served perfectly, our server does not
provide any SDK metadata yet. This means that TyFON CLI would not be able
to auto-generate TyFON SDKs for our server.

To add that ability, we need TyFON CLI installed:

```bash
npm i -g tyfon
```

<br>

First, lets give our functions a name (so that the SDK will have a proper name).
Create `funcs/package.json` like this:

```json | funcs/package.json
{
  "name": "my-funcs"
}
```

<br>

Now lets go inside `funcs` folder and build the SDK metadata:

```bash
cd funcs
tyfon b
cd ..
```

TyFON CLI has built our SDK metadata in `funcs/dist/__api.json`:

```json | funcs/dist/__api.json
{
  "name": "my-funcs",
  "version": "0.0.0",
  "types": {
    "index.d.ts": "declare function getMessage(name: string): Promise<string>;\n\nexport { getMessage };\n"
  },
  "funcs": [
    "getMessage"
  ]
}
```

<br>

Finally, we need to tell our TyFON router to serve this file as well:

```ts | index.ts
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

import { router } from 'tyfon-server';
import * as funcs from './funcs';

const app = express();
app.use(cors());
app.use(json());
app.get('/ping', (_, res) => res.status(200).send('It Works!'));

/*-*/ app.use('/funcs', router(funcs));
/*+*/ app.use('/funcs', router(funcs, require('./funcs/dist/__api')));

app.listen(4000);
```

👉 Check it out on http://localhost:4000/funcs/__api

---

## Step 6: Test the SDK

Lets create another project for testing out our SDK (keep the server running):

```bash
mkdir my-tyfon-client
cd my-tyfon-client
npm i -g ts-node       # if you don't have ts-node
npm init
```

<br>

Install the SDK:
```bash
tyfon i localhost:4000/funcs
```

<br>

Create `index.ts`:
```ts | index.ts
import { getMessage } from '@api/my-funcs';

getMessage('Jack').then(console.log);
```

<br>

👉 Lets run it:

```bash
ts-node .
> Servus Jack!
```

<br><br>

> :ToCPrevNext