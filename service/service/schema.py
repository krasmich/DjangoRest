import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType

from todo.models import Project, Todo
from users.models import User


class ProjectsType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodosType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UsersType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(ObjectType):
    projects = graphene.List(ProjectsType)

    def resolve_projects(root, info):
        return Project.objects.all()

    todos = graphene.List(ProjectsType)

    def resolve_todos(root, info):
        return Todo.objects.all()

    todos_by_project = graphene.List(TodosType, name=graphene.String(required=False))

    def resolve_todos_by_project(root, info, name=None):
        todos = Todo.objects.all()
        if name:
            todos = todos.filter(project__name=name)

        return todos

    todos_by_user = graphene.List(ProjectsType, name=graphene.String(required=False))

    def resolve_todos_by_user(root, info, name=None):
        todos = Todo.objects.all()
        if name:
            todos = todos.filter(project__name=name)

        return todos


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    user = graphene.Field(UsersType)

    @classmethod
    def mutate(cls, root, info, username, first_name, last_name, email):
        user = User(username=username, first_name=first_name, last_name=last_name, email=email)
        user.save()
        return UserCreateMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    user = graphene.Field(UsersType)

    @classmethod
    def mutate(cls, root, info, id):
        User.objects.get(id=id).delete()
        return UserDeleteMutation(user=None)


class Mutations(ObjectType):
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
