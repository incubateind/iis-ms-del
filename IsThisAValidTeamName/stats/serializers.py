from rest_framework import serializers
from .models import BotRun, Company


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model=Company
        fields = ('id', 'name')
    
class BotRunSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model = BotRun
        fields = '__all__'