This challenge involved cross site web socket hijaking but it was done through socket.io and not a real websocket.

Essentially, the header access-control-allow-credentials: * allowed GET requests with credentials to be sent to challenge/socket.io which essentially allowed us to hijack the users socket. This is because we are able to view the response from the GET request which contained the users sid.

With the sid, we can then conduct a handshake with socket.io and then basically communicate. I thought the goal of the challenge was to join different rooms and listen to messages but the challenge author hinted that the bot could run commands. I tried `!flag` and it says that only the admin can run the command. Another thing is that if a URL is sent to the admin, the admin will look at it. Now we have the perfect combo; we can now hijak the admin's socket and send the `!flag` command, then poll for the output of the socket and get the response.
