from rest_framework import mixins, viewsets
from .models import User
from .serializers import UserModelSerializer, UserModelFullSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                           viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelFullSerializer
        return UserModelSerializer

