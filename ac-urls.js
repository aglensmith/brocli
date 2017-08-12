/**
 * @fileOverview - Stuff for building AC urls for navigation
 */


var listOf = {
    'blogs':'/store/admin/content/blogs/bloglist.aspx',
    'errors': '/Store/Admin/Tools/Support/ErrorLog.aspx',
    'posts':'/store/admin/content/blogs/blogpostlist.aspx',
    'categories':'/store/admin/products/categorylist.aspx',
    'pages':'/store/admin/content/pagelist.aspx',
    'customers':'/store/admin/customers/customerlist.aspx',
    'customerTypes': '/store/admin/Customers/CustomerTypeList.aspx?',
    'templates': '/store/admin/customers/emailtemplatelist.aspx',
    'fields':'/store/admin/settings/customfieldlist.aspx',
    'discounts':'/store/admin/marketing/discounts/discountlist.aspx',
    'firewall': '/store/admin/tools/IPBlacklist.aspx?',
    'gateways':'/Store/Admin/Settings/Payments/PaymentGatewayList.aspx?',
    'manufacturers':'/store/admin/products/manufacturerlist.aspx',
    'microstores': '/Store/Admin/Settings/Store/MicrostoreList.aspx?',
    'products':'/store/admin/products/listproducts.aspx',
    'orders':'/store/admin/orders/orderlist.aspx',
    'rules':'/store/admin/tools/analyticrules.aspx?type=Order',
    'sessions': '/store/admin/tools/sessionlist.aspx',
    'shippingMethods':'/store/admin/Settings/Shipping/CustomShippingMethodList.aspx?',
    'themes':'/store/admin/themes/default.aspx',
    'provvalers':'/store/admin/Settings/Shipping/ShippingProvvalers.aspx?',
    'urls':'/Store/Admin/Settings/Global/RedirectURLList.aspx?',
    'users': '/store/admin/settings/users/userlist.aspx?'
};

settingsPage = {
    'basicInformation': '/Store/Admin/Settings/Store/StoreInformation.aspx'
};

//Audit Pages
var categoryAudit = [
    '/store/admin/products/categorylist.aspx?ovu=/store/admin/products/CategoryEdit.aspx%3Fcatval%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityval%3D',
    '%26EntityTypeval%3D10&ovw=0+1&ovn=0+0'
];
var customerAudit = [
    '/store/admin/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3Fval%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityval%3D',
    '%26EntityTypeval%3D320&ovw=0+1&ovn=1+0'
];
var orderAudit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderval%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityval%3D',
    '%26EntityTypeval%3D300&ovw=1+1&ovn=0+0'
];
var productAudit = [
    '/store/admin/products/listproducts.aspx?EntityTypeval=30&ovu=/store/admin/products/productedit/general.aspx%3Fval%3D',
    '+/store/admin/site/entityaudithistory.aspx%3FEntityval%3D',
    '%26EntityTypeval%3D30'
];
var audit = {
    'category': categoryAudit,
    'customer': customerAudit,
    'order': orderAudit,
    'product': productAudit
}

// Edit Pages
var categoryEdit = [
    '/store/admin/products/categorylist.aspx?ovu=/store/admin/products/CategoryEdit.aspx%3Fcatval%3D',
    '&ovw=0&ovn=0'
];
var customerEdit = [
    '/store/admin/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3Fval%3D',
    '&ovw=0&ovn=1'
];
var discountEdit = [
    '/store/admin/marketing/discounts/discountlist.aspx?ovu=/store/admin/marketing/discounts/DiscountEdit.aspx%3FDiscountMethodval%3D',
    '&ovw=0&ovn=0'
];
var orderEdit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderval%3D',
    '&ovw=1&ovn=0'
];
var pageEdit = [
    '/store/admin/content/pagelist.aspx?ovu=/store/admin/content/PageEdit.aspx%3Fval%3D',
    '&ovw=0&ovn=0'
];
var productEdit = [
    '/store/admin/products/listproducts.aspx?ovu=/store/admin/products/productedit/general.aspx%3Fval%3D',
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
    '/store/category.aspx?catval=',
    ''
];
customerEmailHistory = [
    '/store/admin/customers/customerlist.aspx?ovu=/store/admin/Customers/CustomerEmailList.aspx%3Fshownav%3D1%26val%3D',
    '&ovw=0&ovn=1'
];
var orderView = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderval%3D',
    '100215&ovw=1&ovn=0'
];
var sessionView = [
    '/store/admin/tools/sessionlist.aspx?ovu=/store/admin/tools/SessionView.aspx%3Fsessionval%3D',
    '&ovw=0&ovn=0'
];
view = {
    'category': categoryView,
    'email': customerEmailHistory,
    'order': orderView,
    'session': sessionView
};


function buildAcPaths (name, value) {
    
    var s = name.split('-');
    var pageType = s[s.length - 1];
    var entity = s[0];
    var vals = value.split(',');
    var parts;
    var paths = [];

    switch (pageType) {
        case 'list':
            vals.forEach(function(val){
                paths.push(listOf[val]);
            })
            break;
        case 'edit':
            parts = edit[entity];
            vals.forEach(function(val) {
                paths.push(parts[0].concat(val, parts[1]));
            });
            break;
        case 'audit':
            parts = audit[entity];
            vals.forEach(function(val) {
                paths.push(parts[0].concat(val, parts[1], val, parts[2]));
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