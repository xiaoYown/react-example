const networkInterfaces = require('os').networkInterfaces();

const port = 8000;
const isPro = process.env.NODE_ENV == 'production';

function getIPAdress () {
  let IP;
  
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address
      }
    })
  })

  return IP;
}

const IP = getIPAdress()

module.exports = {
  port: port,
  pathUrl: `http://${IP}:${port}/`,
	apiUrl: isPro ? 'http://192.168.0.188:5000' : '/api',
	api: 'http://192.168.0.188:5000',
  appId: 'wx34544d057db97ffd',
  // wbAppId: 3457138857,
  local: true,
  custom: 'cimc'
}
