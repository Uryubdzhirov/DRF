from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from .views import UserModelViewSet
from .models import User as MyUser


# Create your tests here.

class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        factory = APIRequestFactory()
        request = factory.patch('/api/users/')
        view = UserModelViewSet.as_view({'patch': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail(self):
        user = MyUser.objects.create(first_name='NewUser')
        client = APIClient()
        response = client.get(f'/api/users/{user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        user = MyUser.objects.create(first_name='New', last_name='User')
        client = APIClient()
        response = client.patch(f'/api/users/{user.uuid}/', {'first_name': 'Old'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_user_auth(self):
        user = mixer.blend(MyUser)
        client = APIClient()
        admin = MyUser.objects.create_superuser('admin', 'admin@amdin.ru', 'admin123')
        client.login(username='admin', password='admin123')
        response = client.patch(f'/api/users/{user.uuid}/', {'first_name': 'Old'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user = MyUser.objects.get(uuid=user.uuid)
        self.assertEqual(user.first_name, 'Old')
        client.logout()


class TestUserViewSet2(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
