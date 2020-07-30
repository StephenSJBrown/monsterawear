from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from .models import Stock, Order

from manage import gateway
import pdb

# Create your views here.
def index(request):
    return HttpResponse("Hey, you're at the api index. Call /[int] to get the show stock function, or call /create to get the ")

def show(request, stock_id):
    stock = get_object_or_404(Stock, pk=stock_id)
    print(stock)
    return JsonResponse({
        'id':stock_id,
        'item_name':stock.item_name,
        'colour':stock.colour,
        'description':stock.description,
        'value':stock.value,
        's_quantity':stock.s_quantity,
        'm_quantity':stock.m_quantity,
        'l_quantity':stock.l_quantity,
        'xl_quantity':stock.xl_quantity
        })

def generate(request):
    return HttpResponse(gateway.client_token.generate())

@csrf_exempt
def create(request):
    print("issa post")
    nonce = request.POST.get('nonce')
    print("nonce", nonce)
    result = gateway.transaction.sale(
        {
        "amount": request.POST.get('orderTotal'),
        "payment_method_nonce": request.POST.get('nonce'),
        "options": {
        "submit_for_settlement": True
        }
    })
    print(result)
    new_order = Order(
        first_name=request.POST.get('firstName'),
        last_name=request.POST.get('lastName'),
        email=request.POST.get('email'),
        address=request.POST.get('address'),
        postcode=request.POST.get('postcode'),
        items=request.POST.get('items'),
        item_count=request.POST.get('itemCount'),
        total_item_value=request.POST.get('itemTotal'),
        delivery_amount=request.POST.get('deliveryCost'),
        delivery_type=request.POST.get('deliveryType'),
        total_order_value=request.POST.get('orderTotal'),
        transaction_id=result.transaction.id
    )
    new_order.save()
    print(new_order.id)

    return HttpResponse(new_order.id)


# def vote(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     try:
#         selected_choice = question.choice_set.get(pk=request.POST['choice'])
#     except (KeyError, Choice.DoesNotExist):
#         # Redisplay the question voting form.
#         return render(request, 'polls/detail.html', {
#             'question': question,
#             'error_message': "You didn't select a choice.",
#         })
#     else:
#         selected_choice.votes += 1
#         selected_choice.save()
#         # Always return an HttpResponseRedirect after successfully dealing
#         # with POST data. This prevents data from being posted twice if a
#         # user hits the Back button.
#         return HttpResponseRedirect(reverse('polls:results', args=(question.id,)))