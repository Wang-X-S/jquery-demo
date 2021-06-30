const api = jQuery('.father')
api.addClass('red')
const api1 = api.find('.test').addClass('red')
const api2 = api1.end().addClass('222')
api.parent().print();
api.children().print()
const find = jQuery('.find')
find.siblings().print()
//find.index()
