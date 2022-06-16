from rest_framework.serializers import ModelSerializer
from .models import Project, Todo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializerBase(ModelSerializer):

    class Meta:
        model = Todo
        exclude = ('status',)


class TodoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer
    author = UserModelSerializer

    class Meta:
        model = Todo
        exclude = ('status',)
