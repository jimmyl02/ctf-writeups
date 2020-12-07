I solved this challenge after the CTF and I relied heavily on terjanq's solution to learn about service workers and xs-search using error codes. The other component was that the decrypt function did not call .final() so it did not actually verify the contents of the token.

One interesting thing for CSP approach was that the frame source has to be the same one as was being searched via a post request, `https://app.maria-bin.tk/search`, because this was the only way I could get the method of seeing if the page errored to work. This is inherently because on first load the src will be the same as when the form is sent even though one is a GET request and one is a POST request which means no second onload is called. Then, if the page errors, the second onload will be called.

Total credits to ginkoid for creating such a cool challenge and helping me through solving it.

Files in this repo:
- exploit.js - xs-search using status codes
- exploit_csp.js - xs-search using CSP
- exploit_cspcorrectorder.js - xs-search using CSP and some slight modifications [is essentially the same as exploit_csp.js]
- sw.js - service worker which converts GET requests to POST requests
