import sys
sys.path.insert(1, '/home/jimmy/ctf/tools')

from base64 import b64encode, b64decode
from cryptotools import *

# token we want to forge: king-horse-5diuoe7tpxjen8xu0n7

print(len('king-horse-5diuoe7tpxjen8xu0n7'))

# need something of length 30 then we need something close so we can flip the right area

# token for king-horse-5diuoe7tpxjen8xu0n6
token = 'EiSCVBOXLUM/TeKcsmaYC8gUDKDYXmH1ynRwP9grJpCBLL/QPXm9ZO1emN8BFc5VTXeBF6bvtyRn3w=='

token_buff = bytearray(b64decode(token))

# goal is to change the char at pos len(iv) + 29 [30th character]

pos = 12 + 29
token_buff[pos] = token_buff[pos] ^ ord('6') ^ ord('7')

print(b64encode(token_buff))
