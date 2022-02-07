import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import (
    APIRequestFactory,
    force_authenticate,
    APIClient,
    APISimpleTestCase,
    APITestCase,
)

from mixer.backend.django import mixer

# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import ToDo, Project

# Create your tests here.
User = get_user_model()


class TestProjectModelViewSet(TestCase):
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/projects/")
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_ToDo_list(self):
        factory = APIRequestFactory()
        request = factory.get("/api/ToDo/")
        view = ToDoModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project(self):
        factory = APIRequestFactory()
        data = {"name": "Project Test", "repo_link": "http://localhost", "users": []}
        request = factory.post("/api/projects/", data=data, format="json")
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_with_auth(self):
        factory = APIRequestFactory()

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        admin_uuid = admin.uuid

        data = {
            "name": "Project Test",
            "repo_link": "http://localhost",
            "users": [admin_uuid],
        }
        request = factory.post("/api/projects/", data=data, format="json")

        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

 retrieve'})
    class UserViewSet(viewsets.ViewSet):
    def list(self, request):
        pass
    def create(self, request):
        pass
    def retrieve(self, request, pk=None):
        pass
    def update(self, request, pk=None):
        pass
    def partial_update(self, request, pk=None):
        pass
    def destroy(self, request, pk=None):
        pass
    """


class TestToDoViewSet(APITestCase):
    def test_get_ToDo_list(self):
        response = self.client.get("/api/ToDo/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")
        response = self.client.get("/api/ToDo/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_ToDo(self):
        user = User.objects.create(
            email="user@local.host", username="user", password="password"
        )

        project = Project.objects.create(
            name="Project Test", repo_link="http://localhost"
        )
        project.users.add(user)

        todo = ToDo.objects.create(
            project=project, created_by=user, task_text="test text"
        )

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")

        response = self.client.put(
            f"/api/ToDo/{todo.uuid}/",
            {"project": project.uuid, "created_by": user.uuid, "task_text": "NEW TEXT"},
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(uuid=todo.uuid)
        self.assertEqual(todo.task_text, "NEW TEXT")

        self.client.logout

    def test_edit_ToDo_mixer(self):

        todo = mixer.blend(ToDo)

        admin = User.objects.create_superuser("admin", "admin@local.host", "password")
        self.client.login(username="admin", password="password")

        response = self.client.put(
            f"/api/ToDo/{todo.uuid}/",
            {
                "project": todo.project.uuid,
                "created_by": todo.created_by.uuid,
                "task_text": "NEW TEXT",
            },
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(uuid=todo.uuid)
        self.assertEqual(todo.task_text, "NEW TEXT")

        self.client.logout
