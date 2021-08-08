from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

from .models import Picture

class PictureSerializer(serializers.HyperlinkedModelSerializer):
    image=Base64ImageField() # From DRF Extra Fields
    class Meta:
        model = Picture
        fields = ('picId','image')
    def create(self, validated_data):
        image=validated_data.pop('image')
        picId=validated_data.pop('picId')
        return Picture.objects.create(picId=picId,image=image)