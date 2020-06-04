from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the api index.")

def show(request, id):
    return HttpResponse("Show me that item")

def create(request):
    return HttpResponse("Make that order")