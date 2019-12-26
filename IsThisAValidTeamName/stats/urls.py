from django.urls import path, include
from .views import invest, index, redeem

urlpatterns = [
    path('invest/', invest, name='invest'),
    path('', index, name='index'),
    path('redeem/', redeem, name='redeem'),
]