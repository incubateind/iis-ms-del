from django.contrib import admin
from .models import Company, BotRun
# Register your models here.

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code', 'amount_from', 'amount_to', 'risk_factor',)

@admin.register(BotRun)
class BotRunAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'user', 'money', 'days', 'investment_returned', 'return_percent')