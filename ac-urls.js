/**
 * Stuff for building AC urls for navigation
 */


var listOf = {
    'blogs':'/store/admin/content/blogs/bloglist.aspx',
    'blogPosts':'/store/admin/content/blogs/blogpostlist.aspx',
    'categories':'/store/admin/products/categorylist.aspx',
    'contentPages':'/store/admin/content/pagelist.aspx',
    'customers':'/store/admin/customers/customerlist.aspx',
    'customFields':'/store/admin/settings/customfieldlist.aspx',
    'discounts':'/store/admin/marketing/discounts/discountlist.aspx',
    'paymentGateways':'/Store/Admin/Settings/Payments/PaymentGatewayList.aspx?',
    'manufacturers':'/store/admin/products/manufacturerlist.aspx',
    'products':'/store/admin/products/listproducts.aspx',
    'orders':'/store/admin/orders/orderlist.aspx',
    'rules':'/store/admin/tools/analyticrules.aspx?type=Order',
    'shippingMethods':'/store/admin/Settings/Shipping/CustomShippingMethodList.aspx?',
    'shippingProviders':'/store/admin/Settings/Shipping/ShippingProviders.aspx?',
    'urlRedirects':'/Store/Admin/Settings/Global/RedirectURLList.aspx?'
};

settingsPage = {
    'basicInformation': '/Store/Admin/Settings/Store/StoreInformation.aspx'
};

//Audit Pages
var orderAudit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D300&ovw=1+1&ovn=0+0'
];

// Edit Pages
var customerEdit = [
    '/store/admin/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];

var discountEdit = [
    '/store/admin/marketing/discounts/discountlist.aspx?ovu=/store/admin/marketing/discounts/DiscountEdit.aspx%3FDiscountMethodID%3D',
    '&ovw=0&ovn=0'
];
var orderEdit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '&ovw=1&ovn=0'
];
var productEdit = [
    '/store/admin/products/listproducts.aspx?ovu=/store/admin/products/productedit/general.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];


'https://austintest.americommerce.com/store/admin/products/listproducts.aspx?EntityTypeID=30&ovu=/store/admin/products/productedit/general.aspx%3FID%3D42+/store/admin/site/entityaudithistory.aspx%3FEntityID%3D42%26EntityTypeID%3D30'


// Audit Pages
var productAudit = [
    'https://austintest.americommerce.com/store/admin/products/listproducts.aspx?EntityTypeID=30&ovu=/store/admin/products/productedit/general.aspx%3FID%3D',
    '+/store/admin/site/entityaudithistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D30'
]

var audit = {
    'order': orderAudit,
    'product': productAudit
}

var edit = {
    'customer': customerEdit,
    'discount': discountEdit,
    'product': productEdit,
    'order': orderEdit
};

function buildAcPath(name, value) {
    //split switch name to get page type. Ex product-edit
    var s = name.split('-');
    var pageType = s[s.length - 1];
    var entity = s[0];
    var path;

    switch (pageType) {
        case 'list':
            path = listOf[value];
            break;
        case 'edit':
            parts = edit[entity];
            path = parts[0].concat(value, parts[1]);
            break;
    } 
    return path;
}