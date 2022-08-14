from django.urls import path
from . import views

urlpatterns = [
    path('',view=views.test),
    path('register/',view=views.register),
    path('login/',view=views.log),
    path('validate/<str:username>/',view=views.validate)
]