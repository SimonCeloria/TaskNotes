from django.urls import path, include
from rest_framework import routers
from tasks import views

router = routers.DefaultRouter()
router.register('tasks', views.TaskViewSet, 'tasks')

urlpatterns = [
    path('', include(router.urls)),
]
