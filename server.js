const path = require('path')

var jsonData = require('./loginCreds.json')


const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.use('/splunk', createProxyMiddleware({
  target: 'https://splunk-sh1.server.gvsu.edu:8000', // The Splunk server address
  changeOrigin: true,
  auth: `${jsonData.username}:${jsonData.password}`, // Replace with your Splunk credentials
  pathRewrite: {
    '^/splunk': '', // Remove /splunk from the path
  },
}));

app.get('/oktaAuth2', function(req, res) {
  res.sendFile(path.join(__dirname, 'oktaAuth2.html'))
  res.sendFile(path.join(__dirname, 'styles2.css'))
})

app.listen(6969, () => {
  console.log('Proxy server is running on http://localhost:6969');
});
