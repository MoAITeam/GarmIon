from rest_framework import serializers

from .models import Picture

class PictureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Picture
        fields = ('picId','image')