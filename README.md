# Simple real-time chat with Socket.io
## Client - Webpack 5
Go to `client/` directory.
* `npm run serve` - starts local dev server with live reloading on `localhost:8080`
* `npm run dev` - builds development version of application.
* `npm run prod` - builds production version of application in `dist/` folder. Prod verison will be build only, if all tests pass.
* `npm run test` - runs all test with Jest library

## Server - nodejs + express + socket.io
Go to `server/` directory.
* `npm run server` - runs server
* `npm run build-dev` - build development bundle in dist/index.js 
* `npm run build-prod` - build production bundle in dist/index.js