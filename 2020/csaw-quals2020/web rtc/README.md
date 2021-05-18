The challenge was essentially abusing a TURN server to proxy requests which should be from peer to peer and instead use that to send requests to the internal redis server. From there, we had to escape the redis server and get RCE in order to cat the flag.txt in the root directory.

In order to abuse the TURN server, we used a tool called [Turner](https://github.com/staaldraad/turner) to proxy our requests to HTTP.

Once turner is downloaded and installed, just use the command `./turner -server web.chal.csaw.io:3478` to spawn a proxy on port 8080 that will forward the requests to the internal network.

To escape from redis, I used a tool by jas502n which can be found [here](https://github.com/jas502n/Redis-RCE). The main difficulty was that we did not have a direct connection to the redis server and it was just easier to rewrite the exploit myself. You can find that code in the server-exploit.py and client-exploit.py files. 

A brief explanation of how this works is that because the server was running redis 4, which we found by running the INFO command, we could use the slaveof command. This would tell redis to look at our server as the master. From the master, which is written in server-exploit.py, combined with more commands on the client redis server, we can coerce redis into running a module which would then give us RCE.
