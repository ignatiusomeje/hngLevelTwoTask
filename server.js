const http = require('http');
const App = require('./app')

const server = http.createServer(App)
server.listen(3000, ()=> console.log('...Server Connected'))