/**
 * Stuff for building AC urls for navigation
 */

var listOf = {
    'blogs':'',
    'categories':'/store/admin/products/categorylist.aspx',
    'customers':'',
    'manufacturers':'/store/admin/products/manufacturerlist.aspx',
    'products':'/store/admin/products/listproducts.aspx',
    'orders':'',
    'shippingMethods':'',
    'shippingProviders':''
};

var orderEdit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '&ovw=1&ovn=0'
];

var orderAudit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D100215%26EntityTypeID%3D300&ovw=1+1&ovn=0+0'
];

var edit = {

};

var orderView;

function buildUrl (str1, str2, str3) {
    return str1.concat(str2, str3);
}