from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from todoapp.filters import ProjectFilter


from .models import Project, ToDo
from .serializers import ProjectSerializer, ToDoSerializer



class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoDeleteView(APIView):
    def delete(self, request, pk=None):
        todo = get_object_or_404(ToDo, pk=pk)
        todo.is_active = False
        todo.save(update_fields=["is_active"])
        return Response({"status": "OK"})


class ToDoViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    ToDoDeleteView,
    mixins.ListModelMixin,
    GenericViewSet,
):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    filterset_fields = ["project"]
    pagination_class = ToDoLimitOffsetPagination


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination
