from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Accounts


class AccountsModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Accounts
        fields = ['username', 'firstname', 'lastname', 'email']