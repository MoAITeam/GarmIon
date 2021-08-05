from rest_framework import viewsets

from .serializers import PictureSerializer
from .models import Picture


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all().order_by('picId')
    serializer_class = PictureSerializer