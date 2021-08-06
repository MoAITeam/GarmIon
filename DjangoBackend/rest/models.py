from django.db import models
class Picture(models.Model):
    picId = models.CharField(max_length=60)
    image = models.ImageField(upload_to ='uploads/')
    def __str__(self):
        return self.picId