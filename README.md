Pre-requisites
1. Electron - httpd://electron.atom.io - used to for development and pacaking
2. Node - http://nodejs.org - for build tools and getting latest versus of third party scripts

Starting (from the rats directory)
> electron .

Building
> gulp-zip

Packaging (various distros)
> electron-packager build/ rats --platform win32 --arch ia32 --electronVersion 1.6.2 --overwrite
> electron-packager build/ rats --platform linux --arch ia32 --electronVersion 1.6.2 --overwrite
> electron-packager build/ rats --platform win32 --arch x64 --electronVersion 1.6.2 --overwrite
> electron-packager build/ rats --platform linux --arch x64 --electronVersion 1.6.2 --overwrite

Distribution (just the 32bit distros)
> cd rats-win32-ia32/; rm rats-windows-latest.zip; zip rats-windows-latest.zip *; cd ..; butler push rats-win32-ia32/rats-windows-latest.zip dashbangsplat/rats:windows-latest
> cd rats-linux-ia32/; rm rats-linux-latest.zip; zip rats-linux-latest.zip *; cd ..; butler push rats-linux-ia32/rats-linux-latest.zip dashbangsplat/rats:linux-latest
