import requests
from io import BytesIO
from PIL import Image
from pyzbar.pyzbar import decode

def getAndDecode(url):
    r = requests.get(url)
    i = Image.open(BytesIO(r.content))
    print([obj.data for obj in decode(i)])

base_url = 'http://maze.noobarmy.org/projects/justsomerandomfoldername/'

for i in range(0, 28):
    getAndDecode(base_url + 'image-' + str(i) + '.png')
