var settings = (function(){

    var saveAll = function() {
        $('.brocli-setting').each(function(i, el){
            chrome.storage.local.set({[el.id]: el.checked || el.value}, function() {
            });
        });
    };

    var loadAll = function() {
        $('.brocli-setting').each(function(i, el){
            chrome.storage.local.get(el.id, function (items) {
                if (el.type == "text")
                    el.value = items[el.id];
                else
                    el.checked = items[el.id];
            });  
        });
    };

    return {
        save: saveAll,
        load: loadAll
    };

})();

settings.load();

$("#saveButton").click(
    function(e){
        settings.save();
        e.preventDefault();
    }
);