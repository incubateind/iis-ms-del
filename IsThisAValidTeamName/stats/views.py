from django.shortcuts import render, redirect
from django.http import JsonResponse
from .agent import make_agent, make_model
from rest_framework.response import Response
from .models import Company, BotRun
import datetime
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required
from .serializers import BotRunSerializer
import json

# from rest_framework.

# Create your views here.
def data(request):
    response = {'status':402}
    params = request.GET
    if request.method == 'GET':
        response['status'] = 200
        return JsonResponse(response, safe=False)
    else:
        return JsonResponse(response, safe=False)

@login_required(login_url='login')
def index(request):

    total_investments = 0
    total_returns = 0

    investments = BotRun.objects.filter(user=request.user, redeemed=False)

    for investment in investments:
        total_investments += investment.money #- investment.money_left
        total_returns += investment.money + investment.investment_returned #- investment.money_left 
    

    return render(request, template_name='index.html', context={
        'total_investments' : total_investments,
        'total_returns' : round(total_returns, 3),
        'investments' : investments,
        'investments_json' : json.dumps(BotRunSerializer(investments, many=True).data)
    })

@api_view(['GET', 'POST'])
@login_required(login_url='login')
def invest(request):
    if request.method != 'POST':
        return render(request, 'invest.html', {'companies': Company.objects.all()})

    #days, risk & money

    days = int(request.data.get('days', None))
    money = int(request.data.get('money', None))

    now = datetime.datetime.now()
    d = datetime.timedelta(days=days)

    date = now - d

    if 'company' not in request.data:
        risk = int(request.data.get('risk', None))
        company = Company.objects.filter(risk_factor=risk, amount_from__gte=money, amount_to__lte=money)

        if company.count() < 1:
            company = Company.objects.all()
        
        company = company[0]
    else:
        company = Company.objects.get(pk=request.data.get('company'))

    money_saved = 0

    model = make_model(company.code, start="{}-{}-{}".format(date.year, date.month, date.day))

    agent = make_agent(model, money - money_saved, iterations=500)

    states_buy, states_sell, total_gains, invest = agent.buy()

    BotRun.objects.create(
        company=company,
        user=request.user,
        money=money,
        days=days,
        money_left=money_saved,
        investment_returned=total_gains,
        return_percent=invest,
        buy_coords=','.join([str(x) for x in states_buy]),
        sell_coords=','.join([str(x) for x in states_sell]),
        plot_coords=','.join([str(x) for x in agent.trend])
    )
    
    return Response({'success':True})

    # return redirect('index')


@api_view(['POST'])
@login_required(login_url='login')
def redeem(request):
    BotRun.objects.filter(pk=request.data.get('id'), user=request.user).update(redeemed=True)
    return Response({'success':True})