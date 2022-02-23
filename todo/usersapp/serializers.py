from rest_framework.serializers import HyperlinkedModelSerializer

from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "uuid"
        ]

class UserModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "is_superuser",
            "is_staff",
        ]
