# `tyfon build`

> [storage](:Icon (align=-6px)) Server-Side Command

> [alt_route](:Icon) Alias: `tyfon b`

<br><br>

Generates necessary networking code and SDK metadata. Will automatically
be called by `tyfon serve` on the first run when not built or built
using an older version of TyFON. Will call `tyfon init` if not initialized.

👉 WILL NOT be triggered automatically when server-code changes. You need to run it
manually before you update client SDKs.

```bash
tyfon build
>{hex('#616161') #}
>{hex('#616161') #} 🏗️ Building network layer code and client SDK metadata ...
>{hex('#616161') #}
>{hex('#28df99') #}
>{hex('#28df99') #} ✅ Network layer code and client SDK metadata built! 🍻
>{hex('#28df99') #}
```

---

## Building Docker Images

👉 Requires [Docker](http://docker.com) to be installed!

You can provide `-i` or `--image` option to build a production Docker image instead of building
to local file system:

```bash
tyfon build --image my-tyfon-server
>{hex('#616161') #}
>{hex('#616161') #} 🚢 Building docker image {hex('#c355f5') my-tyfon-server} {hex('#616161') ...}
>{hex('#616161') #}
>...
>{hex('#28df99') #}
>{hex('#28df99') #} ✅ Docker image {hex('#c355f5') my-tyfon-server} successfully built!
>{hex('#28df99') #}
>{hex('#28df99') #} 👉 Test the image locally:
>{hex('#28df99') #} {hex('#c355f5') $} {hex('#9e9e9e') docker run -it -p 8000:8000 my-tyfon-server}
>{hex('#28df99') #}
>{hex('#28df99') #} 🚀 Deploy the image:
>{hex('#28df99') #} {hex('#c355f5') $} {hex('#9e9e9e') docker push my-tyfon-server}
>{hex('#28df99') #}
```

<br>

👉 If you want to push to a custom registry, simply do this:

```bash
docker tag my-tyfon-server https://my-registry.cloud/my-tyfon-server
docker push https://my-registry.cloud/my-tyfon-server
```

> :Buttons
> > :Button label=Learn More, url=https://docs.docker.com/engine/reference/commandline/push/

<br><br>

> :ToCPrevNext