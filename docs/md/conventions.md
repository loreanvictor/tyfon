# Conventions

TyFON based on a series of conventions. Instead of asking you to explicitly mention which URL should be used
for each method, which methods should be exported, how should their exported types behave, etc., it will try to
deduce all of that based on some simple and convenient-to-follow rules. This does mean that you need to follow
some of these rules and conventions for TyFON to work properly.

---

## Conventions You Must Follow

> [gavel](:Icon) Remote functions (and possibly their argument / return types) MUST be exported from `index.ts`. Nothing
> else should be exported from `index.ts`.
> > :Collapse label=See Examples
> >
> > Don't export internal stuff:
> > ```ts
> > /*~*/export/*~*/ function internalFunction() { /* ... */ }
> > ```
> > <br>
> >
> > Don't export classes:
> > ```ts
> > /*~*/export class A {}/*~*/
> > ```
> > <br>
> > 
> > If you have functions in other folders, export them from `index.ts`:
> > ```ts | index.ts
> > export * from './src';
> > ```

<br>

> [gavel](:Icon) Remote functions MUST be async or return a Promise.
> > :Collapse label=See Examples
> >
> > This is wrong:
> > ```ts
> > /*~*/export const f = () => 'Hellow World!';/*~*/
> > ```
> > This is correct:
> > ```ts
> > export const f = async () => 'Hellow World!';
> > ```

<br>

> [gavel](:Icon) Argument types and return types MUST be plain JavaScript objects.
> > :Collapse label=See Examples
> >
> > This is wrong:
> > ```ts
> > class A { ... }
> > export function f(/*~*/a: A/*~*/) { ... }
> > ```
> > This is correct:
> > ```ts
> > interface A { ... }
> > export function f(a: A) { ... }
> > ```

<br>

> [gavel](:Icon) Exported types MUST be local, i.e. arguments and return types of remote
> functions MUST not be dependent on external dependencies.
> > :Collapse label=See Examples
> >
> > This is wrong:
> > ```ts
> > import { A } from 'some-dependency';
> > interface B { a : A };
> > export function f(/*~*/b: B/*~*/) { ... }
> > ```
>
> ☝️ This rule is more of a technical limitation and might get removed later on.

---

## Conventions You Should Know

> [gavel](:Icon) Client SDK package will be named `@api/<server-name>`, where `<server-name>` comes
> from `package.json` on server-side code.

<br>

> [gavel](:Icon) If two client SDKs share the same name, the one installed later overwrites the former.
>
> ☝️ So always pick a proper name for your server-side code.

---

## Under the Hood Conventions

TyFON uses the following conventions to map functions to endpoints. Since it follows the same rules
on client-side SDK, you typically don't need to worry about these rules.

> [gavel](:Icon) Functions are mapped to endpoints strictly based on their name:
>
> - `getSomething() ------> GET    /something`
>
>
> - `addSomething() ------> POST   /something`
> - `createSomething() ---> POST   /something`
> - `postSomething() -----> POST   /something`
>
>
> - `updateSomething() ---> PUT    /something`
> - `setSomething() ------> PUT    /something`
> - `putSomething() ------> PUT    /something`
>
>
> - `deleteSomething() ---> DELETE /something`
> - `removeSomething() ---> DELETE /something`
>
>
> - `whateverElse() ------> POST   /whateverElse`

> :ToCPrevNext