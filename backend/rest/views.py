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

@api_view(['GET', 'POST', 'DELETE'])
def NeuralNetworkResult(request):
    if request.method == 'POST':
        image_data = JSONParser().parse(request)
        if (elaborate(image_data['picId'])):
            queryset = Picture.objects.all().values()
            return JsonResponse({"recommended garments": list(queryset)})
 
def elaborate(number):
    return True

#curl --header "Content-Type: application/json" --data "{\"picId\":0,\"image\":\"hexdata\"}" http://127.0.0.1:8000/neuralnetwork
#poi fai tipo http://127.0.0.1:8000/pictures/1/ e ti scarichi l'immagine