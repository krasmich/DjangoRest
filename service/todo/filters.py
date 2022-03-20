from django_filters import rest_framework as filters
from .models import Todo


class TodoFilter(filters.FilterSet):
    create = filters.DateFromToRangeFilter()

    class Meta:
        model = Todo
        fields = ['project', 'created_date']