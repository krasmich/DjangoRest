from rest_framework.serializers import ModelSerializer, StringRelatedField
from users.serializers import SimpleAccountsModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class SimpleProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = ['name_project']


class TodoModelSerializer(ModelSerializer):
    creator = SimpleAccountsModelSerializer()
    project = SimpleProjectModelSerializer()

    class Meta:
        model = Todo
        # fields = '__all__'
        exclude = ['id']
