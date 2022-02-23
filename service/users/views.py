from rest_framework.viewsets import ModelViewSet
from .models import Accounts
from .serializers import AccountsModelSerializer


class AccountsModelViewSet(ModelViewSet):
    queryset = Accounts.objects.all()
    serializer_class = AccountsModelSerializer

