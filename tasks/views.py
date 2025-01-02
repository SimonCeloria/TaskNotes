from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializer import TaskSerializer
from django.http import HttpResponseForbidden
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes, authentication_classes

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_document(self, request, pk=None):
        task = self.get_object()
        description = request.data.get('description', '').strip()  # Obtener y limpiar la descripción
        task.description = description
        task.save()
        return Response({"Task updated": task.description})

    @action(detail=True, methods=['patch'])
    def toggle_done(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()
        return Response({"done": task.done})

    @action(detail=True, methods=['get'])
    def user_tasks(self, request, pk=None):
        if not request.user.is_authenticated:
            return HttpResponseForbidden("Debes estar autenticado para ver tus tareas.")
        user = request.user
        tasks = Task.objects.filter(user=user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
