# ServerThermalPrinter

Install the dependencies
```
* Preferably install the dependencies using npm:
npm install
```

Build
```
* Windows:
npm run build:win

* Linux:
npm run build:linux

* Mac:
npm run build:mac
```

* Remember to run in administrator mode (in Linux you can use the flag: --no-sandbox)

To use:
```
With the application running, make a post request with the body like the example below:

curl -X POST http://localhost:3030/print \
  -H "Content-Type: application/json" \
  -d '{"text": "Ola Mundo"}'

```

I hope it helped :)
