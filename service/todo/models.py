from django.db import models
from django.utils import timezone

from users.models import Accounts


class Project(models.Model):
    name_project = models.CharField(max_length=128)
    link_repository = models.URLField(max_length=200)
    users = models.ManyToManyField(Accounts)

    def __str__(self):
        return self.name_project


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_note = models.TextField(blank=True, null=True)
    created_date = models.DateField(default=timezone.now, blank=True, null=True)
    updated_date = models.DateField(blank=True, null=True)
    creator = models.ForeignKey(
        Accounts,
        null=True,
        related_name="todo_created_by",
        on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
