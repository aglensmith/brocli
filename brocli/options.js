var saveButton = "saveButton";

var settings = (function(){
    var self = this;
   
    var all = [
        {executeFromAddressbar: $('#executeFromAddressbar')},
        {defaultSearchUrl: $('#executeFromAddressbar')},
        {commandFolderPath: $('#executeFromAddressbar')}
    ];

    var save = function(setting, value) {
        chrome.storage.local.set({setting: value}, function() {
            message(setting + "saved");
        });
    };

    var saveAll = function() {
        all.forEach(function(setting){
            if (setting.type == "text")
                save(setting.id, setting.value);
            else 
                save(setting.id, setting.checked);
        })
    };

    var load = function(setting) {
        chrome.storage.local.get(setting, function (items) {
            $(setting).val(items[setting]);
        });  
    };

    var loadAll = function() {
        all.forEach(function(setting){
            load(setting.id)
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
        e.prevrentDefault();
    }
);