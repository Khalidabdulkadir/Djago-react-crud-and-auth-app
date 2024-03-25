from .models import Teacher
from rest_framework import serializers

# Serializers define the API representation.
class TeacherSerialisers(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
