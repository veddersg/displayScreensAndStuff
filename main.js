//So this will be our cathall for all the client-side logic

function splunkReportRequest(id) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/serverSide.php?action=generateURL&id='+id, true)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //console.log(xhr.responseText)
      var url = JSON.parse(xhr.responseText)
      console.log("Banana")
      console.log(url)
    }
  }
  xhr.send()
}

function fetchIframeData(iframeID) {
  return new Promise(function(res, rej) {
    var xhr = new XMLHttpRequest()

    xhr.open('GET', '/serverSide.php?action=generateURL&id='+iframeID, true)
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 ) {
        if (xhr.status === 200) {
          //resolve promise with response data
          console.log(xhr.responseText)
          res(JSON.parse(xhr.responseText))
        } else {
          rej('Error fettching data for iframe with ID ' + iframeID + " Status: " + xhr.status + " readyState: " + xhr.readyState)
        }
      }
    }
    xhr.send()
  })
}
/*Driver code*/
//splunkReportRequest('lockedAccountsList1')
var iframeIDs = []
var iframes = document.querySelectorAll('iframe')

iframes.forEach(function(iframe) {
  //check for id
  if (iframe.id) {
    iframeIDs.push(iframe.id)
  }
})

console.log("iframe IDs: ", iframeIDs)

iframeIDs.forEach(function(iframeID) {
  console.log("inside last foreach: ", iframeID)
  fetchIframeData(iframeID)
    .then(function(data) {
      //handle response data
      console.log("Data: ", data)

      //update the src attrbute of the corresponding iframe
      var iframe = document.getElementById(iframeID)
      if (iframe) {
        iframe.src = data.url
      }
    })
    .catch(function(error) {
      //Handle errors
      console.error(error);
    })
})
