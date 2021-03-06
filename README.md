# Rats!

This was created as an entry for a linux game jam hosted in itch (https://dashbangsplat.itch.io/rats)

## Description
Ever want to be a rat in a maze searching for cheese? Well this is your lucky day! Rats! is a game about being a rat in a maze looking for cheese.I was made for the Linux Game Jam in March 2017. (https://itch.io/jam/linux-jam-2017)

## Pre-requisites
1. Node.js - http://nodejs.org - for build tools and getting latest versus of third party scripts
2. Electron.io - httpd://electron.atom.io - used to for development and pacaking (i.e. `npm install -g electron`)
3. Electron Packager - build binaries for various platforms and architectures (i.e. `npm install -g electron-packager`)
4. Install all the dev deps in the rats dir for things like gulp and phaser-ce (i.e. `npm install`)
5. Note: node-canvas is one of the npm dev deps, cairo is a Pre-requisite for node-canvas (see https://www.npmjs.com/package/canvas for more details)

## Starting (from the rats directory)
```
> electron .
```

## Unit Testing
```
> npm test
```

## Building
```
> gulp
```

## Gulp packaging options
```
> gulp dist_options
```

## Gulp packaging examples
```
> gulp dist_win32_x64
> gulp dist_linux_x64
> gulp dist_darwin_x64
```
or generate dists for all platforms on an architecture

```
> gulp dist_all_x64
```

## Gulp butler examples (also calls associated dist_* task)
```
> gulp butler_win32_x64
> gulp butler_linux_x64
> gulp butler_darwin_x64
```

or push all platforms on an architecture to butler

```
> gulp butler_all_x64
```

## Manual packaging (various distros)
```
> electron-packager build/ rats --platform win32 --arch ia32 --overwrite
> electron-packager build/ rats --platform linux --arch ia32 --overwrite
> electron-packager build/ rats --platform darwin --arch ia32 --overwrite
> electron-packager build/ rats --platform win32 --arch x64 --overwrite
> electron-packager build/ rats --platform linux --arch x64 --overwrite
> electron-packager build/ rats --platform darwin --arch x64 --overwrite
```

## Manual distribution (just the 32bit distros)
```
> cd rats-win32-ia32/; rm rats-windows-latest.zip; zip rats-windows-latest.zip *; cd ..; butler push rats-win32-ia32/rats-windows-latest.zip dashbangsplat/rats:windows-latest
> cd rats-linux-ia32/; rm rats-linux-latest.zip; zip rats-linux-latest.zip *; cd ..; butler push rats-linux-ia32/rats-linux-latest.zip dashbangsplat/rats:linux-latest
> cd rats-darwin-ia32/; rm rats-mac-latest.zip; zip rats-mac-latest.zip *; cd ..; butler push rats-darwin-ia32/rats-mac-latest.zip dashbangsplat/rats:mac-latest
```
