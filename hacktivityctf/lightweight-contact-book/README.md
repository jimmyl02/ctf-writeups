Essentially this challenge was an injection on an LDAP implementation in Python. 

The key observation was identifying which library was used and how searching could be done. I found the library to be python-ldap and the way you search through attributes can actually be used in some interesting ways. First, the format is like the following (&(condition1=something)(condition2=something)). I deduced the search to be something like (&(condition1=[INJECT HERE])). So with this we can first search for attribute names by injecting `)(attribute=*`. If there is any results, then the attribute exists. 

Now we have a list of attributes, we can actually search what they are because of the `*` in LDAP. How we would do this is `username)(attribute=[prefix]*` and if a result is returned, then we know that the attribute has that value. We then search for all properties of admin and see that his password is in his description.

Finally, we just login and get the flag.
