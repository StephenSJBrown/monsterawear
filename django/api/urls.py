from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:stock_id>', views.show, name='show'),
    path('generate', views.generate, name='generate'),
    path('create', views.create, name='create'),
]

