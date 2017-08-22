/**
 * @fileOverview - Stuff for building AC urls for navigation
 */

var prefix = '/Store/Admin'

var listOf = {
    'alerts': '/Settings/Global/OrderAlertEmails.aspx?',
    'blogs': '/content/blogs/bloglist.aspx',
    'categories': '/products/categorylist.aspx',
    'customers': '/customers/customerlist.aspx',
    'customerTypes':  '/Customers/CustomerTypeList.aspx?',
    'discounts': '/marketing/discounts/discountlist.aspx',   
    'errors': '/Tools/Support/ErrorLog.aspx',
    'fields': '/settings/customfieldlist.aspx',
    'firewall':  '/tools/IPBlacklist.aspx?',
    'gateways': '/Settings/Payments/PaymentGatewayList.aspx?',
    'manufacturers': '/products/manufacturerlist.aspx',
    'microstores': '/Settings/Store/MicrostoreList.aspx?',
    'orders': '/orders/orderlist.aspx',
    'pages': '/content/pagelist.aspx',
    'posts': '/content/blogs/blogpostlist.aspx',
    'products': '/products/listproducts.aspx',
    'providers': '/Settings/Shipping/ShippingProviders.aspx?',
    'rules': '/tools/analyticrules.aspx?type=Order',
    'sessions': '/tools/sessionlist.aspx',
    'shippingMethods': '/Settings/Shipping/CustomShippingMethodList.aspx?',
    'shippingRegions': '/Settings/Shipping/ShippingRegions.aspx?',
    'templates': '/customers/emailtemplatelist.aspx',
    'themes': '/themes/default.aspx',
    'urls': '/Settings/Global/RedirectURLList.aspx?',
    'users': '/settings/users/userlist.aspx?',
    'warehouses': '/products/warehouses.aspx?'
};
``````````````
var settingsPage = {
    'payments':  '/Settings/Payments/StorePaymentOptions.aspx',
    'shipping':  '/Settings/shipping/shippingoptions.aspx',
    'store':  '/Settings/Store/StoreInformation.aspx',

    'info':  '/Settings/Store/StoreInformation.aspx',
    'search':  '/Settings/Store/SEOSettings.aspx',
};

//Audit Pages
var categoryAudit = [
     '/products/categorylist.aspx?ovu=/store/admin/products/CategoryEdit.aspx%3FcatID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D10&ovw=0+1&ovn=0+0'
];
var customerAudit = [
     '/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3FID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D320&ovw=0+1&ovn=1+0'
];
var orderAudit = [
     '/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D300&ovw=1+1&ovn=0+0'
];
var productAudit = [
     '/products/listproducts.aspx?EntityTypeID=30&ovu=/store/admin/products/productedit/general.aspx%3FID%3D',
    '+/store/admin/site/entityaudithistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D30'
];
var audit = {
    'category': categoryAudit,
    'customer': customerAudit,
    'order': orderAudit,
    'product': productAudit
}

// Edit Pages
var categoryEdit = [
     '/products/categorylist.aspx?ovu=/store/admin/products/CategoryEdit.aspx%3FcatID%3D',
    '&ovw=0&ovn=0'
];
var customerEdit = [
     '/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];
var discountEdit = [
     '/marketing/discounts/discountlist.aspx?ovu=/store/admin/marketing/discounts/DiscountEdit.aspx%3FDiscountMethodID%3D',
    '&ovw=0&ovn=0'
];
var orderEdit = [
     '/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '&ovw=1&ovn=0'
];
var pageEdit = [
     '/content/pagelist.aspx?ovu=/store/admin/content/PageEdit.aspx%3FID%3D',
    '&ovw=0&ovn=0'
];
var productEdit = [
     '/products/listproducts.aspx?ovu=/store/admin/products/productedit/general.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];
var edit = {
    'category': categoryEdit,
    'customer': customerEdit,
    'discount': discountEdit,
    'page': pageEdit,
    'product': productEdit,
    'order': orderEdit
};

//view pages
var categoryView = [
    '/store/category.aspx?catID=',
    ''
];
customerEmailHistory = [
     prefix + '/customers/customerlist.aspx?ovu=/store/admin/Customers/CustomerEmailList.aspx%3Fshownav%3D1%26ID%3D',
    '&ovw=0&ovn=1'
];
var orderView = [
     prefix + '/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '100215&ovw=1&ovn=0'
];
var sessionView = [
     prefix + '/tools/sessionlist.aspx?ovu=/store/admin/tools/SessionView.aspx%3FsessionID%3D',
    '&ovw=0&ovn=0'
];
var view = {
    'category': categoryView,
    'email': customerEmailHistory,
    'order': orderView,
    'session': sessionView
};

function buildAcPaths (name, val) {
    
    var s = name.split('-');
    var pageType = s[s.length - 1];
    var entity = s[0];
    var vals = val.split(',');
    var parts;
    var paths = [];

    switch (pageType) {
        case 'list':
            vals.forEach(function(val){
                paths.push(prefix.concat(listOf[val]));
            })
            break;
        case 'edit':
            parts = edit[entity];
            vals.forEach(function(val) {
                paths.push(prefix.concat(parts[0], val, parts[1]));
            });
            break;
        case 'audit':
            parts = audit[entity];
            vals.forEach(function(val) {
                paths.push(prefix.concat(parts[0], val, parts[1], val, parts[2]));
            });
            break;
        case 'view':
            parts = view[entity];
            vals.forEach(function(val) {
                paths.push(parts[0].concat(val, parts[1]));
            });
            break;
    } 
    return paths;
}