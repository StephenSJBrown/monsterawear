from django.db import models
from django.utils import timezone

import datetime

# Create your models here.
class Stock(models.Model):
    item_name = models.CharField(max_length=200)
    colour = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    value = models.DecimalField(max_digits=5, decimal_places=2)
    s_quantity = models.PositiveIntegerField(null=True)
    m_quantity = models.PositiveIntegerField(null=True)
    l_quantity = models.PositiveIntegerField(null=True)
    xl_quantity = models.PositiveIntegerField(null=True)

    def __str__(self):
        return self.item_name

class Order(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    items = models.CharField(max_length=2000)
    total_item_value = models.DecimalField(max_digits=5, decimal_places=2)
    address = models.CharField(max_length=1000)
    delivery_type = models.CharField(max_length=200)
    delivery_amount = models.DecimalField(max_digits=3, decimal_places=2)
    total_order_value = models.CharField(max_length=200)
    order_date = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.full_name
