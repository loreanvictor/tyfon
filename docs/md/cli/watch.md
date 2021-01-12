# `tyfon watch`

> [storage](:Icon (align=-6px)) Server-Side Command

> [alt_route](:Icon) Alias: `tyfon w`

<br><br>

Like [tyfon serve](/cli/serve), but also rebuilds SDK metadata on code change. As a result,
it is a bit slower (and also less surgical on change detection).

```bash
tyfon watch
>{hex('#616161') #}
>{hex('#616161') #} 🏗️ Building network layer code and client SDK metadata ...
>{hex('#616161') #}
>{hex('#28df99') #}
>{hex('#28df99') #} ✅ Network layer code and client SDK metadata built! 🍻
>{hex('#28df99') #}
>{hex('#616161') #}
>{hex('#616161') #} 🚀 Serving exported functions on the netwrok ...
>{hex('#616161') #}
>my-tyfon-server listening at http://localhost:8000
```

---

## Serve Options

Accepts all the parameters that [tyfon serve](/cli/serve) accepts:

```bash
tyfon watch --port 4000
tyfon w -e ENV=staging
tyfon watch --mode prod
```

> :Buttons
> > :Button label=Learn More, url=/cli/serve

---

## Client Sync

Use `--client` or `-c` to specify a client project folder and watch will also keep the client SDK there
in sync:

```bash
tyfon watch --client ../my-tyfon-client
>...
>{hex('#616161') #}
>{hex('#616161') #} 🚀 Serving exported functions on the netwrok ...
>{hex('#616161') #}
>my-tyfon-server listening at http://localhost:8000
>{hex('#c355f5') #}
>{hex('#c355f5') #} Client SDK in sync with current API.
>{hex('#c355f5') #} {hex('#616161') client address} {hex('#ed0cef') /Users/Me/Projects/my-tyfon-client/}
>{hex('#c355f5') #}
```

<br>

☝️ If, after a code change on the server, the API differs from what is installed on specified client folder,
the `watch` command will also re-install the client SDK in that folder. Note that the SDK **MUST** be installed
before hand with [tyfon install](/cli/install).

<br><br>

> :ToCPrevNext