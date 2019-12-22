from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Company(models.Model):

    name = models.CharField(max_length=50)
    code = models.CharField(max_length=50)

    risk_factor = models.PositiveSmallIntegerField()
    amount_from = models.PositiveIntegerField()
    amount_to = models.PositiveIntegerField()

    def __str__(self):
        return self.name
    
class BotRun(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    money = models.PositiveIntegerField()
    days = models.PositiveIntegerField()
    money_left = models.PositiveIntegerField()

    investment_returned = models.FloatField()
    return_percent = models.FloatField()

    buy_coords = models.TextField()
    sell_coords = models.TextField()
    plot_coords = models.TextField()
    redeemed = models.BooleanField(default=False)