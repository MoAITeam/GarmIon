from django.db import models
class Picture(models.Model):
    picId = models.CharField(max_length=60)
    def __str__(self):
        return self.picId