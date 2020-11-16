<div align="center">
  <img src="/tyfon-type.svg" width="320px"/>
  <div><b>Ty</b>ped <b>F</b>unctions <b>O</b>ver <b>N</b>etwork</div>
</div>

<br><br>

TyFON serves simple TypeScript functions over network and makes it extremely easy to consume them. It is a CLI tool that
generates necessary wrapper code and metadata for your functions to be served and can consume metadata served on other TyFON instances
to generate client-side SDK with exactly the same types.
```bash
npm i tyfon -g
```

<br><br>

## Usage

### Server-Side

Suppose you have `index.ts`:
```ts
export function getMsg(name: string) {
  return `Hellow ${name}!`;
}
```

Init tyfon and serve your function:
```bash
tyfon init
tyfon serve
```

Now open `localhost:8000/msg?0=World`.

<br>

### Client-Side

```bash
tyfon add localhost:8000
```

In your client-side code, use the function like any other package:

```ts
import { getMsg } from '@api/backend';

getMsg('World').then(console.log);
```
