# Request Context

<br><br>

> ⚠️⚠️ **WARNING** ⚠️⚠️
>
> This feature **MUST** be used with cautious. Accessing request context is intended **ONLY** for webhooks.
> Functions accessing request context **CAN NOT BE USED** by TyFON clients.

<br>

Sometimes it might be useful to access request context, i.e. the received network request object
and a response object for manually responding. This is specifically true when a function is invoked
by some client other than a TyFON client, where the request is perhaps not populated according to
TyFON conventions.

In order to access request context, first install `tyfon-server`:

```bash
npm i tyfon-server
```

<br>

Now access the context like this:

```ts
import { RequestContextAware } from 'tyfon-server/context';
import { accessRequestContext } from 'tyfon-server';


export function myWebHook(this: RequestContextAware) {
  const context = accessRequestContext(this);

  context.request.body; // --> this is the request body

  // ...

  context.response.status(418).send();
}
```

☝️ You can also return a value (or a promise of a value), which would be serialized to JSON
and sent with status code `200`, like any other TyFON function. If you respond manually, any returned
value will be ignored.

<br>

Note that `myWebHook()` will now be unusable in TyFON client code:

```ts
import { myWebHook } from '@api/my-tyfon-server';

/*~*/myWebHook()/*~*/;  // --> `myWebHook()` expects a `this` argument now.
```

<br><br>

> :ToCPrevNext