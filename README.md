# Express.js & TypeScript

## Setting up an Express project with TypeScript

Create package.json & tsconfig.json

```bash
$ npm init --yes
$ tsc --init
```

Configure tsconfig file

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
}
```

Create the `./src` folder

Install express , body-parser , and nodemon

```bash
$ npm install --save express body-parser
$ npm install --save-dev nodemon
```
