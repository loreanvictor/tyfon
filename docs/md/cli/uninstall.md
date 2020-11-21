# `tyfon uninstall`

> [phonelink](:Icon (align=-6px)) Client-Side Command

<br><br>

Will uninstall the SDK corresponding to given URL / package-name:

```bash
tyfon uninstall localhost:8000
```
-- OR --

```bash
tyfon uninstall @api/my-tyfon-server
>{hex('#616161') #}
>{hex('#616161') #} Removing packages ...
>{hex('#616161') #}
>{hex('#616161') #} 🧹 Removing {hex('#ed0cef') http://localhost:8000} ( {hex('#c355f5') @api/my-tyfon-server} ) ...
>{hex('#616161') #}
>...
>{hex('#616161') #}
>{hex('#616161') #} ✨ 1 SDKs removed.
>{hex('#616161') #}
```

<br>

👉 You can also provide multiple package names / URLs to the command:
```bash
tyfon uninstall @api/sdk1 https://url-for-sdk2 ...
```

<br><br>

> :ToCPrevNext