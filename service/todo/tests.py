import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase
from mixer.backend.django import mixer
from users.models import User
from .views import ProjectModelViewSet
from .models import Project, Todo


class TestProjectViewSet(TestCase):

    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get('api/project/')
        admin = User.objects.create_superuser('admin', 'admin@admin.local', 'admin')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_list(self):
        factory = APIRequestFactory()
        request = factory.get('api/todos/')
        admin = User.objects.create_superuser('admin', 'admin@admin.local', 'admin')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_detail(self):
        user = User.objects.create(username='new', email='new@new.ru', password='new')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.local', 'admin')
        client.login(username='admin', password='admin')
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_users(self):
        user = mixer.blend(User, username='stason')
        admin = User.objects.create_superuser('admin', 'admin@admin.local', 'admin')
        self.client.login(username='admin', password='admin')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_user = json.loads(response.content)
        self.assertEqual(response_user[0]['username'], 'stason')
        self.assertEqual(response_user[1]['username'], 'admin')
