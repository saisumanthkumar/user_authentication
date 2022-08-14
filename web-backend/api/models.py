from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30,primary_key=True)
    mail = models.EmailField()
    password = models.CharField(max_length=30)
    token = models.CharField(max_length=256,default=None)