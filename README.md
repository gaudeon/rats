# Rats!

This was created as an entry for a linux game jam hosted in itch (https://dashbangsplat.itch.io/rats)

## Description
Ever want to be a rat in a maze searching for cheese? Well this is your lucky day! Rats! is a game about being a rat in a maze looking for cheese.I was made for the Linux Game Jam in March 2017. (https://itch.io/jam/linux-jam-2017)

## Pre-requisites
1. Node.js - http://nodejs.org - for build tools and getting latest versus of third party scripts
2. Electron.io - httpd://electron.atom.io - used to for development and pacaking (i.e. `npm install -g electron`)
3. Electron Packager - build binaries for various platforms and architectures (i.e. `npm install -g electron-packager`) 
4. Install all the dev deps in the rats dir for things like gulp and phaser-ce (i.e. `npm install`)

Starting (from the rats directory)
```
> electron .
```

Building
```
> gulp
```

## Packaging (various distros)
```
> electron-packager build/ rats --platform win32 --arch ia32 --overwrite
> electron-packager build/ rats --platform linux --arch ia32 --overwrite
> electron-packager build/ rats --platform darwin --arch ia32 --overwrite
> electron-packager build/ rats --platform win32 --arch x64 --overwrite
> electron-packager build/ rats --platform linux --arch x64 --overwrite
> electron-packager build/ rats --platform darwin --arch x64 --overwrite
```

## Distribution (just the 32bit distros)
```
> cd rats-win32-ia32/; rm rats-windows-latest.zip; zip rats-windows-latest.zip *; cd ..; butler push rats-win32-ia32/rats-windows-latest.zip dashbangsplat/rats:windows-latest
> cd rats-linux-ia32/; rm rats-linux-latest.zip; zip rats-linux-latest.zip *; cd ..; butler push rats-linux-ia32/rats-linux-latest.zip dashbangsplat/rats:linux-latest
> cd rats-darwin-ia32/; rm rats-mac-latest.zip; zip rats-mac-latest.zip *; cd ..; butler push rats-darwin-ia32/rats-mac-latest.zip dashbangsplat/rats:mac-latest
```
