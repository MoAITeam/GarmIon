from rest_framework import viewsets

from .serializers import PictureSerializer
from .models import Picture
from rest_framework.decorators import api_view

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all().order_by('picId')
    serializer_class = PictureSerializer

    def create(self, request, format=None): # overrides rest framework native post method
        serializer = PictureSerializer(data=request.data)
        if serializer.is_valid():
            pictureId = request.data.get('picId')
            serializer.save(
                    picId= pictureId,
                    image=request.data.get('image')
               )
            return JsonResponse({"recommended garments": "none"})