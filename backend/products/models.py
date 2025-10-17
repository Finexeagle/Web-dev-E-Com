from django.db import models

# Create your models here.
class Products(models.Model):
    price = models.DecimalField(max_digits=5, decimal_places=2)
    title = models.CharField(max_length=10)
    on_stock = models.BooleanField()
    description = models.TextField(blank=True, null=True)
    ratings = models.DecimalField(max_digits=2, decimal_places=1)
