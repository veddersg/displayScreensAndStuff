function autoscroll2() {
  const scrollContainers = document.querySelectorAll('.iframe-container')
  //const iframe = document.getElementById('autoscroll')
  console.log("autoscroll2 fired")

  scrollContainers.forEach((scrollContainer) => {

    const iframe = scrollContainer.querySelector('.autoscroll-iframe')

    //If we don't find an autoscroll object within an iframe container, then there's no reason to continue with any of this
    if (!iframe) {
      console.log("no autoscroll object found. returning")
      return
    }

    let scrollPosition = 0
    let scrollDirection = 0.7 //This is actually scroll speed, essentially. Might come back and change the name
    const minVisibleHeight = 100 //minimum height of the content that should always be visible

    const paustDuration = 2000 //pause duration in milliseconds
    const initialDelay = 4000

    console.log("Made it to scrollstep")
    function scrollStep() {
      console.log("Inside scroll step")
      scrollPosition += scrollDirection
      iframe.style.transform = `translateY(-${scrollPosition}px)` //well this is an interesting way to do this

      //case that we've hit the bottom
      if (scrollPosition >= iframe.scrollHeight - scrollContainer.clientHeight - minVisibleHeight) {
        scrollDirection = -0.7
        setTimeout(() => window.requestAnimationFrame(scrollStep), paustDuration) //does pause at the bottom. Might actually come back and change this behavior to just make height reset at 0
      } else if (scrollPosition <= 0) { //case that we're at the top
        scrollDirection = 0.7
        setTimeout(() => window.requestAnimationFrame(scrollStep), paustDuration) //gonna keep the top pause though
      } else {
        window.requestAnimationFrame(scrollStep)
      }
    }
    //console.log("Exiting scroll step")
    //kickoff for scrollstep
    setTimeout(() => window.requestAnimationFrame(scrollStep), initialDelay)
  })
}

function autoscroll3() {
  console.log('in autoscroll3()')
   const tbodies = document.querySelectorAll('tbody')

   console.log(tbodies.length)

   const scrollDuration = 2000
   const pauseDuration = 2000

   //This should supposedly scroll down but I don't trust it
   tbodies.forEach((tbody) => {
     console.log('entered for each loop')
     tbody.scrollto({
       top: targetScrollTop,
       behavior: "smooth"
     })
     console.log('completed down scroll')

     //pause after scrolling
     setTimeout(() => {
       tbody.scrollto({
         top: 0,
         behavior: "smooth"
       })
     }, pauseDuration)
     console.log('completed upp scroll')

     //reset Scrolling Loop
     console.log('resetting')
     autoscroll3()
   })
}

/* -- Driver Code -- */

// kicks off our autoscroll function
// window.onload = function() {
//             setTimeout(() => {
//               autoscroll3();
//             }, 5000)
// };

window.onload = function() {
  const iframes = document.querySelectorAll('iframe')
  console.log(iframes.length)

  iframes.forEach((iframe) => {
    console.log('in the foreach loop')
    iframe.onload = function() {
      console.log('in the iframe onload function')

      const tbody = iframe.contentDocument.querySelector('tbody')
      if (tbody) {
        console.log('found a tbody')
      } else {
        console.log('didn\'t find a tbody')
      }
    }
    console.log('past the onload')
  })
}
