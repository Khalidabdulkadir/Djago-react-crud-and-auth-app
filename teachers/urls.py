from rest_framework import routers
from .views import TeacherViews
from django.urls import path, include

router = routers.DefaultRouter()
router.register('', TeacherViews, 'teachers')
urlpatterns = [
    path('', include(router.urls))
]