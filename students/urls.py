from rest_framework import routers
from .views import studentView
from django.urls import path, include

router = routers.DefaultRouter()
router.register('', studentView, 'students')
urlpatterns = [
    path('', include(router.urls))
]