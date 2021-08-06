from django.db import models

# Create your models here.
class Images(models.Model):

    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='img')

    def __str__(self):
        return self.title