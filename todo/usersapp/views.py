# from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import AllowAny

from .models import User
from .serializers import UserModelSerializer


# Create your views here.


class UserModelViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
