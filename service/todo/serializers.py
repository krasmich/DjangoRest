from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'
