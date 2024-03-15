from django.db import models
from django.utils import timezone

# Create your models here.
class Student(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=254, null=False, blank=False)
    course = models.CharField(max_length=100, null=False, blank=False)
    nationalId = models.CharField(max_length=100, null=False, blank=False)
    date_reg = models.DateTimeField(default=timezone.now, null=False, blank=False)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.name

