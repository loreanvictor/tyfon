# Error Handling

<br><br>

When an endpoint fails, conventionally the endpoint should return a not-ok status code, based
on what went wrong. You can do the same thing in TyFON by throwing errors that also have a `status`
property. It is recommended to use a module such as [http-errors](https://www.npmjs.com/package/http-errors)
for that purpose:

```bash
npm i http-errors
npm i @types/http-errors --save-dev
```
```ts
import errors from 'http-errors';

export function myRemoteFunc(...) {
  ...

  if (/* the user does not have access*/) {
    throw new errors.Forbidden('This operation is not allowed!');
  } else if (/* the thing is not found */) {
    throw new errors.NotFound('Could not find that thing');
  }

  ...
}
```
<br>

> 👉 When the thrown error object has a status code, TyFON will use that status code
> for the response. So in this example, if the first condition holds, the response
> will be `403`, if the second condition holds, the response will be `404`, etc.

<br>

> 👉 Also, if the thrown error has `expose` property set on it to `false`,
> then TyFON will not include the error message in the response. For [http-errors](https://www.npmjs.com/package/http-errors),
> `expose` property is by default set to `false` for any error with status code `>= 500`.

<br><br>

> :ToCPrevNext