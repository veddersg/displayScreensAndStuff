function autoScrollIframe(iframe) {
            const contentWindow = iframe.contentWindow;
            let scrollPosition = 0;
            let scrollDirection = 1; // 1 for down, -1 for up

            function scrollStep() {
                scrollPosition += scrollDirection; // Adjust the scroll speed as needed
                contentWindow.scrollTo(0, scrollPosition);

                if (scrollPosition >= contentWindow.document.body.scrollHeight - contentWindow.innerHeight) {
                    scrollDirection = -1; // Change direction to up
                } else if (scrollPosition <= 0) {
                    scrollDirection = 1; // Change direction to down
                }

                window.requestAnimationFrame(scrollStep);
            }

            // Start the scrolling
            window.requestAnimationFrame(scrollStep);
        }

        // Wait for all iframes to load before starting the scroll
        document.querySelectorAll('iframe.auto-scroll').forEach(iframe => {
            iframe.onload = function() {
                autoScrollIframe(iframe);
            };
        });
