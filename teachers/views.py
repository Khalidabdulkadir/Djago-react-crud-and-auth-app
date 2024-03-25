from rest_framework import  viewsets, permissions
from .models import Teacher
from .serialisers import TeacherSerialisers
from rest_framework.pagination import PageNumberPagination
# Create your views here.

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class TeacherViews(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    permission_classes = [ permissions.AllowAny ]
    pagination_class = CustomPageNumberPagination
    serializer_class = TeacherSerialisers
    queryset = Teacher.objects.filter().order_by('-id')