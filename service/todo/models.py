from django.db import models
from django.utils import timezone

from users.models import User


class Project(models.Model):
    name_project = models.CharField(verbose_name='Название', max_length=128, unique=True)
    link_repository = models.URLField(verbose_name='Репо', max_length=200)
    users = models.ManyToManyField(User, verbose_name='Юзеры')

    def __str__(self):
        return self.name_project

    class Meta:
        db_table = 'project_list'
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='Проект', related_name='todo')
    text_note = models.TextField(verbose_name='Текст заметки', blank=True, null=True)
    created_date = models.DateField(verbose_name='Создано', default=timezone.now, blank=True, null=True)
    updated_date = models.DateField(verbose_name='Обновлено', blank=True, null=True)
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name='Автор')
    status = models.BooleanField(verbose_name='Активно', default=True)

    def __str__(self):
        return self.text_note

    class Meta:
        db_table = 'todo_list'
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
