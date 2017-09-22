// This will become options page at some point
// Or, set values from storage/sync. 

function getParams (urlString) {
    var url = new URL(urlString);
    var params = {};
    url.searchParams.forEach(function(k,v) {
        if (k && v) {
            params[k] = v;
        }
    });
    return params;
}

// for getting website field value
var zdDomain = 'https://americommerce.zendesk.com';

// default search -- for executing commands without keyword
var defaultSearch = new URL("https://www.google.com/search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:iOSSearchLanguage}{google:searchClient}{google:sourceId}{google:instantExtendedEnabledParameter}{google:contextualSearchVersion}ie={inputEncoding}");
var defaultSearchPath = defaultSearch.origin + defaultSearch.pathname;
var defaultSearchUrl = defaultSearch.href;
var searchParam = getParams(defaultSearch.href)['%s'];