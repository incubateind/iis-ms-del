from django.shortcuts import render, redirect
from django.http import JsonResponse
from .serializers import UserSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from rest_framework.decorators import api_view

# Create your views here.

# @api_view(['GET', 'POST'])
def login(request):

    if request.user and request.user.is_authenticated:
        return redirect('index')
    
    if request.method != 'POST':
        return render(request, 'login.html')
    elif request.method == 'POST':
        
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            django_login(request, user)
            return redirect('index')
        
        return render(request, 'login.html', context={'invalid' : True})


@api_view(['GET', 'POST'])
def register(request):

    if request.user and request.user.is_authenticated:
        return redirect('index')
    
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':

        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()
            # login(request, user)

            return Response({'success':True}, status=200)
        
        return Response(serializer.errors, status=400)
        # data = request.POST
        # if 'name' not in data:
        #     response['field'] = 'name'
        # elif 'username' not in data:
        #     response['field'] = 'username'
        # elif 'password' not in data:
        #     response['field'] = 'password'

        # return JsonResponse(response, safe=False)
        
def logout(request):

    django_logout(request)

    return redirect('login')