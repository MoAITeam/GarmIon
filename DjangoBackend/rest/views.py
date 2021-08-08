from rest_framework import viewsets
from rest_framework.response import Response

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
            serializer.save()
            queryset = Picture.objects.all().values()
            queryset = queryset[0:3]
            # neuralnetwork(serializer.data['image'])
            return Response({'recommended garments':list(queryset)}, status=201)
        return Response(serializer.errors, status=400)


# curl -X POST -S -H 'Accept: application/json' -H 'Content-Type: multipart/form-data' -F "picId=35" -F "image=@C:/Users/ciuff/test.jpg" http://127.0.0.1:8000/pictures/