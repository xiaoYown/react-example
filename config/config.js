var port = 3000;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.188:5000',
	apiUrl: isPro ? 'http://www.xxx.com' : '/api',
	api: 'http://192.168.0.188:5000'
}