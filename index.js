var visionRequst = require('./vision-request.js')

var detectionType = null
if(process.argv.length === 4) {
  var detectionType = process.argv.pop()
}
var imageUrl = process.argv.pop()

visionRequst(imageUrl, detectionType)