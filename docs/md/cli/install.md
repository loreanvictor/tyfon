# `tyfon install`

> [phonelink](:Icon (align=-6px)) Client-Side Command

> [alt_route](:Icon) Alias: `tyfon i`

<br><br>

Installs (or updates) TyFON SDK for given URL. 

👉 The URL **MUST** be that of a TyFON server.

```bash
tyfon i localhost:8000
>{hex('#616161') #}
>{hex('#616161') #} 🚚 Installing TyFON SDK for {hex('#ed0cef') localhost:8000} ...
>{hex('#616161') #}
>...
>{hex('#28df99') #}
>{hex('#28df99') #} 📦 TyFON SDK for {hex('#ed0cef') http://localhost:8000} ( {hex('#c355f5') @api/my-tyfon-server} ) installed successfully!
>{hex('#28df99') #}
```

<br>

The SDK package will be named `@api/<server-name>`, where `<server-name>` is specified in `package.json` of
the TyFON server code.

👉 Will add the URL to TyFON URLs in `package.json` (`"tyfons"` property).

> [warning](:Icon (align=-6px)) **IMPORTANT**
>
> If two TyFON servers on different URLs share the same name, the SDK installed later will be written over
> the SDK installed earlier.

<br>

👉 You can also provide multiple package names / URLs to the command:
```bash
tyfon install localhost:8000 https://url-for-sdk2 ...
```

---

## Installing/Updating All SDKs

You can invoke `tyfon install` without any arguments to install/update all TyFON SDKs (fetched from `package.json`, `"tyfons"` property).

```bash
tyfon install
```

👉 Will skip over SDKs it cannot fetch.

<br>

> [move_to_inbox](:Icon (align=-6px)) **FRESH INSTALLS**
>
> For fresh install of a project that uses TyFON SDKs, you need to install
> TyFON SDKs _before_ other NPM packages:
> ```bash
> tyfon i   # --> first install TyFON SDKs
> npm i     # --> then install other packages
> ```

---

## Environment Management

You might want to use different URLs of a service for different environments. For example, during development,
you might want to work with the development version of a TyFON server which runs on `localhost:8000`, but
for production switch to `https://my-tyfon-server.cloud`.

For that purpose, you can provide the 
`--env` parameter to `tyfon install` to tag each URL with the environment it should be used in:

```bash
tyfon i https://my-tyfon-server.cloud --env prod
tyfon i localhost:8000 --env dev
```

👉 Setup your dev environment like this:
```bash
tyfon i --env dev
```

👉 Build your client-code for production like this:
```bash
tyfon i --env prod
```

> If `--env` parameter is not provided and no argument is given to `tyfon i`, then it will only
> install SDKs that are NOT tagged for any particular environments.

<br>

> When you install an SDK first time like this:
> ```bash
> tyfon i localhost:8000 --env dev
> ```
> Further updates, i.e.:
> ```bash
> tyfon i localhost:8000              # --> localhost:8000 still will be for dev env
> ```
> will preserve the environment marked for `localhost:8000`, unless you
> explicitly specify a new environment via `--env` parameter:
> ```bash
> tyfon i localhost:8000 --env test   # --> the environment will now change to test
> ```

<br><br>

> :ToCPrevNext