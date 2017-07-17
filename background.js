<script>

//Sets the description and styling for the default suggestion. The default suggestion is the text that is displayed in the first suggestion row underneath the URL bar.

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    console.log(text);
    if (text.search('coffee') > -1) {
        var suggestions = [];

        suggestions.push({ content: 'Coffee - Wikipedia', description: 'Coffee - Wikipedia' });
        suggestions.push({ content: 'Starbucks Coffee', description: 'Starbucks Coffee' });

        suggest(suggestions);
        console.log(suggestions);
    }
});

chrome.experimental.omnibox.onInputEntered(function(text, disposition) {
    console.log(text);
    window.open('http://google.com');
});
</script>