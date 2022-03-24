from rest_framework.serializers import ModelSerializer
from .models import Accounts


class AccountsModelSerializer(ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['username', 'firstname', 'lastname', 'email']


class SimpleAccountsModelSerializer(ModelSerializer):
    class Meta:
        model = Accounts
        fields = ['username']
