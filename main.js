
/* -- Global variables --*/

//As it stands, these are useless variables for the time being. But I didn't feel like
// going back and rewrtiing a bunch of things in a bunch of different files
const reloadInterval = 15000 //This is the interval that sets the refresh interval for the iframe report. It is in milliseconds

const delayTag = document.querySelector('script[src="main.js"]')
const initialReloadDelay = delayTag ? parseInt(delayTag.getAttribute('data-initial-delay'), 10) : 0

//Let's so numPages will be hard-coded for now but this logic would be what we want to use
//if we were going to have a variable number of pages and then just change it in the html pages themselves
// const pageTag = document.querySelcector('script[src="mian.js"]')
// const numPages = pageTag ? parseInt(pageTag.getAttribute('num-pages'), 10) : 1
const numPages = 5

/* -- Functions --*/

//This is a useless function currently. If we ever get whatever is hosting these pages
//on the same site as our splunk server, then this might come in handy. But CORS/XSS
// is going to stop this from functioning properly.
//
//Either that or it's the janky CSS one we made... Don't really remember. Mostly just left
// this in for reference.
function autoscroll2() {
    const scrollContainers = document.querySelectorAll('.iframe-container');
    console.log("autoscroll2 fired");

    scrollContainers.forEach((scrollContainer) => {
        const iframe = scrollContainer.querySelector('.autoscroll');

        // If we don't find an autoscroll object within an iframe container, then there's no reason to continue with any of this
        if (!iframe) {
            console.log("no autoscroll object found. returning");
            return;
        }

        let scrollPosition = 0;
        let scrollDirection = 0.7; // This is actually scroll speed, essentially. Might come back and change the name
        const minVisibleHeight = 100; // Minimum height of the content that should always be visible
        const pauseDuration = 2000; // Pause duration in milliseconds
        const initialDelay = 4000; // Initial delay before auto-scrolling starts

        console.log("Made it to scrollstep");

        function scrollStep() {
            console.log("Inside scroll step");
            scrollPosition += scrollDirection;
            iframe.style.transform = `translateY(-${scrollPosition}px)`; // Well this is an interesting way to do this

            // Case that we've hit the bottom
            if (scrollPosition >= iframe.scrollHeight - scrollContainer.clientHeight - minVisibleHeight) {
                scrollDirection = -0.7;
                console.log('at bottom')
                setTimeout(() => window.requestAnimationFrame(scrollStep), pauseDuration); // Pause at the bottom
            } else if (scrollPosition <= 0) { // Case that we're at the top
                scrollDirection = 0.7;
                console.log('at top')
                setTimeout(() => window.requestAnimationFrame(scrollStep), pauseDuration); // Pause at the top
            } else {
                console.log('scrolling')
                window.requestAnimationFrame(scrollStep);
            }
        }

        // Start the scrolling after the initial delay
        setTimeout(() => window.requestAnimationFrame(scrollStep), initialDelay);
        //scrollStep()
    });
}

//Function for automatically reloading reports when they are off screen. I think I might
// throw a variaable for setting the time interval up towards the top. But if not, it'll be
// declared in the code here so that should only have to be changed once.

function autoReloadiframes() {
  const iframes = document.querySelectorAll("iframe")

  iframes.forEach((iframe) => {
    iframe.src = iframe.src //what the hell?
  });
}

/* -- Driver Code --*/
// setTimeout(() => {
//   autoReloadiframes() //initial reload
//   setInterval(autoReloadiframes, reloadInterval * numPages) //Runs autoreload in a given amount of time
// }, initialReloadDelay)

//So this should be a simplified version of our driver code which will reload the iframes when a tab is clicked away from
// in theory, I guess
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') {
    autoReloadiframes()
  }
})

//I might've figured out the issue with our extension so I'm just going to comment this out for now -- ignore this for now
// window.onload = function() {
//     //setTimeout(() => autoscroll2(), 2000)
//     autoscroll2()
// };
