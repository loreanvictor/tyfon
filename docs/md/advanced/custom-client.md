# Custom Client

<br><br>

You can use [`tyfon-client`](https://github.com/loreanvictor/tyfon-client) 
to easily work with TyFON servers without using auto-generated SDKs:

```bash
npm i tyfon-client
```
```ts
import { invoke } from 'tyfon-client';

invoke('http://localhost:4000/funcs', 'getMessage', 'Jack').then(console.log);
```

<br>

The `invoke()` method takes the URL for the TyFON server as the first argument (**MUST** start with `http://` or `https://`),
the name of the function to invoke as the second argument, and the rest of the arguments will be passed to the remote
function.

<br><br>

> :ToCPrevNext