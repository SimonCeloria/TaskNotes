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
        print("Encabezados recibidos:", self.request.headers)
        print("Usuario autenticado:", self.request.user)
        return Task.objects.filter(user=self.request.user)

    @action(detail=True, methods=['patch'])
    def toggle_done(self, request, pk=None):
        task = self.get_object()
        task.done = not task.done
        task.save()
        return Response({"done": task.done})

    @action(detail=True, methods=['get'])
    def user_tasks(self, request, pk=None):
        print("Usuario autenticado:", request.user)
        print("Encabezados recibidos:", request.headers)
        if not request.user.is_authenticated:
            return HttpResponseForbidden("Debes estar autenticado para ver tus tareas.")
        user = request.user
        tasks = Task.objects.filter(user=user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
