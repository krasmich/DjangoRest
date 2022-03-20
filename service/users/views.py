from rest_framework import mixins, viewsets
from .models import Accounts
from .serializers import AccountsModelSerializer


class AccountsModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                           viewsets.GenericViewSet):
    queryset = Accounts.objects.all()
    serializer_class = AccountsModelSerializer
