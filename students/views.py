from rest_framework import  viewsets, permissions
from .models import Student
from .serilizers import StudentSerializer
from rest_framework.pagination import PageNumberPagination
# Create your views here.

class CustomPageNumberPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 100
    
class studentView(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    permission_classes = [ permissions.AllowAny ]
    pagination_class = CustomPageNumberPagination
    serializer_class = StudentSerializer
    queryset = Student.objects.filter().order_by('-id')