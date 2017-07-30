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

//settings
settingsPage = {
    'basicInformation': '/Store/Admin/Settings/Store/StoreInformation.aspx'
};


//customers
var customerEdit = [
    '/store/admin/customers/customerlist.aspx?ovu=/store/admin/customers/CustomerEdit.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];

//discounts
var discountEdit = [
    '/store/admin/marketing/discounts/discountlist.aspx?ovu=/store/admin/marketing/discounts/DiscountEdit.aspx%3FDiscountMethodID%3D',
    '&ovw=0&ovn=0'
];

//orders
var orderEdit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '&ovw=1&ovn=0'
];

var orderAudit = [
    '/store/admin/orders/orderlist.aspx?ovu=/store/admin/accounting/OrderEdit.aspx%3FOrderID%3D',
    '+/store/admin/site/EntityAuditHistory.aspx%3FEntityID%3D',
    '%26EntityTypeID%3D300&ovw=1+1&ovn=0+0'
];

//products
var productEdit = [
    '/store/admin/products/listproducts.aspx?ovu=/store/admin/products/productedit/general.aspx%3FID%3D',
    '&ovw=0&ovn=1'
];

var edit = {
    'product': productEdit
};

var orderView;

function editEntity (str1, str2, str3) {
    return str1.concat(str2, str3);
}

function buildAcPath(name, value) {
    
    //split to get page type. Ex product.edit

    var s = name.split('.');
    var pageType = s[s.length - 1];
    var entity = s[0];
    var path;
    console.log('builpaths:');
    console.log(name);
    console.log(s);
    console.log(pageType);
    console.log(entity);
    console.log(path);
    switch (pageType) {
        case 'list':
            path = listOf[value];
            break;
        case 'edit':
            parts = edit[entity];
            path = parts[0] + value + parts[1];
            break;
    } 
    return path;
}