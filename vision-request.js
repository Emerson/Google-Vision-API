var request = require('request')
var base64 = require('node-base64-image')
var util = require('util')

var config = require('./config.json')

var options = {
  url: 'https://vision.googleapis.com/v1/images:annotate?key=' + config.apiKey,
  headers: {
    'Content-Type': 'application/json'
  }
}

function requestData(fileData) {
  return {
      requests: [{
        image:{
          content: fileData
        },
        features:[
          {
            type: "LABEL_DETECTION",
            maxResults: 5
          }
        ]
      }]    
    }
}

function downloadImage(url, cb) {
  base64.base64encoder(url, {string: true}, function(err, image) {
    if(err) { return cb(err) }
    cb(null, image)
  })
}

function visionRequest(url, cb) {
  downloadImage(url, function(err, base64Image) {
    console.log('Image downloaded')
    if(err) {
      console.log(err)
      return
    }
    request.post({url: options.url, body: JSON.stringify(requestData(base64Image))}, function(err, res) {
      if(err) {
        console.log(err)
        return
      }
      if(cb) {
        cb(null. JSON.parse(res.body))
      }
      console.log(util.inspect(JSON.parse(res.body), false, null))
    })
  })
}

module.exports = visionRequest
