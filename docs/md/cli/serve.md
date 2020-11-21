# `tyfon serve`

> [storage](:Icon (align=-6px)) Server-Side Command

> [alt_route](:Icon) Alias: `tyfon s`

<br><br>

Serves the functions exported from `index.ts` over network. Will reload the server
when code changes, and will call `tyfon build` on the initial run if not built before
or if built using an older version of TyFON.

👉 WILL NOT call `tyfon build` on code change, so SDK metadata won't be updated!

```bash
tyfon serve
>{hex('#616161') #}
>{hex('#616161') #} 🚀 Serving exported functions on the netwrok ...
>{hex('#616161') #}
>[{cyan INFO}] {gray 10:45:39} ts-node-dev ver. 1.0.0 (using ts-node ver. 9.0.0, typescript ver. 4.1.2)
>my-tyfon-server listening at http://localhost:8000
```

---

## Running Port

You can specify the server port via `-p` or `--port`:

```bash
tyfon serve -p 3000
>{hex('#616161') #}
>{hex('#616161') #} 🚀 Serving exported functions on the netwrok ...
>{hex('#616161') #}
>[{cyan INFO}] {gray 10:45:39} ts-node-dev ver. 1.0.0 (using ts-node ver. 9.0.0, typescript ver. 4.1.2)
>my-tyfon-server listening at http://localhost:3000
```

---

## Environment Variables

You can specify environment variables for the server process via `-e` or `--env`:

```bash
tyfon s -e ENV=staging -e LOGS=/var/log/my-tyfon-server/
```

---

## Production Mode

You can serve the code in production mode by specifying `-m` or `--mode`:

```bash
tyfon s --mode prod
```

In production mode, the built JS code will be used and live-reload will be turned off.
Additionally, the `TYFON_SERVE_MODE` environment variable will be set to whatever mode
you pass to `--mode` for the server process.

<br><br>

> :ToCPrevNext