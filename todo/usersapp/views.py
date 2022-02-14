# from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


# Create your views here.


class UserModelViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 2:
            return UserModelSerializerV2
        return UserModelSerializer
