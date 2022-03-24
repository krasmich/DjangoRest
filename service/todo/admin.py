from django.contrib import admin

# Register your models here.
from .models import Project, Todo

admin.site.register(Project)
admin.site.register(Todo)