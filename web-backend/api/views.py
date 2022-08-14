from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from .models import User
from .utils import parse
import hashlib
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def test(request):
    return HttpResponse('Hello World')

@csrf_exempt
def register(request):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        try:
            req_data = parse(body)
        except:
            req_data = eval(body)
        
        users = User.objects.all()
        user_req = users.filter(username=req_data['username'])
        if len(user_req) == 0:
            code = req_data['password']+req_data['username']
            encoded_token = str(hashlib.sha256(code.encode()).hexdigest())
            try:
                User(
                    username = req_data['username'],
                    password = req_data['password'],
                    mail = req_data['mail'],
                    token = encoded_token
                ).save()
                return JsonResponse({"status":'OK'})
            except:
                return JsonResponse({"status":'ERROR'})
        else:
            return JsonResponse({"status":'ERROR'})

@csrf_exempt
def log(request):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        try:
            req_data = parse(body)
        except:
            req_data = eval(body)
        
        users = User.objects.all()
        user_req = users.filter(username=req_data['username'])
        if len(user_req) > 0 and user_req[0].password == req_data['password']:
            return JsonResponse({"status":'OK',"data":{
                "username":user_req[0].username,
                "token":user_req[0].token
            }})
        else:
            return JsonResponse({"status":'ERROR',"data":{}})

@csrf_exempt
def validate(request,username):
    if request.method == 'POST':
        body = request.body.decode('utf-8')
        try:
            req_data = parse(body)
        except:
            req_data = eval(body)
        
        users = User.objects.all()
        user_req = users.filter(username=username)
        if len(user_req) > 0 and user_req[0].token == req_data['token']:
            return JsonResponse({"status":'OK',"data":{
                "mail":user_req[0].mail
            }})
        else:
            return JsonResponse({"status":'ERROR',"data":{}})