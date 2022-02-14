from dataclasses import field
from email.policy import default
from typing_extensions import Required
import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from scipy.fft import idct

from usersapp.models import User
from todoapp.models import ToDo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(ObjectType):
    all_todos = graphene.List(ToDoType)
    todos_by_id = graphene.Field(ToDoType, id=graphene.ID(required=True))
    todos_by_active = graphene.List(ToDoType, active=graphene.Boolean())
    todos_by_project_name = graphene.List(ToDoType, name=graphene.String())

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_todos_by_id(self, info, id):
        try:
            return ToDo.objects.get(id=id)
        except:
            return None

    def resolve_todos_by_active(self, info, active=None):
        todos = ToDo.objects.all()
        if active:
            todos = todos.filter(is_active=active)
        return todos

    def resolve_todos_by_project_name(self, info, name):
        todos = ToDo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query)
