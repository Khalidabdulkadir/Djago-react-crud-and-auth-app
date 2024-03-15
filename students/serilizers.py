from .models import Student
from rest_framework import serializers

# Serializers define the API representation.
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
