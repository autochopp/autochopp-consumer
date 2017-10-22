# Autochopp App

Multiplataform mobile application made with Ionic 3

## How to execute

```
ionic serve
```

## How to build

The first mode, need `src/environments/environment.dev.ts` with api in production url. 
Install the lasted version of graddle and deploy:

```
$ ionic cordova run android
```

To use live reload, just add `--livereload` flag.

To generate apk using production variables:

```
$ npm run ionic:build --prod
```