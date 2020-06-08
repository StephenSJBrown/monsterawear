from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect

from .models import Stock, Order

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

def create(request):

    new_order = Order(
        full_name=request.POST['name'],
        email=request.POST['email'],
        items=request.POST['items'],
        total_item_value=request.POST['total_item_value'],
        address=request.POST['address'],
        delivery_type=request.POST['delivery_type'],
        delivery_amount=request.POST['delivery_amount'],
        total_order_value=request.POST['total_order_value']
    )
    new_order.save()

    return HttpResponseRedirect("http://www.monsterawear.com/confirm", id=new_order.id)


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