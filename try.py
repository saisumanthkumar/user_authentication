import requests
import json
url = 'http://127.0.0.1:8000/api/login/'

data = {
    'username':'sai_suamnth_kumar',
    'password':'james',
    'mail':'saisuamnthkuamr@gmail.com'
}

data = json.dumps(data)
req = requests.post(url,data)
print(req.json())