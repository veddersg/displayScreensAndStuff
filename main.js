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

// Driver Code - kicks off our autoscroll function
window.onload = function() {
    //setTimeout(() => autoscroll2(), 2000)
    autoscroll2()
};
