var currentLocation;

// omnibar
chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
  runCommands(commands);
});

// popup terminal
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  runCommands(request.commands);
});

// directly from addressbar
chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    if (!executeFromAddressbar)
      return
    var url = new URL(details.url);
    var query = url.searchParams.get(searchParam);
    var cl = new URL(currentLocation);
    var splitText = query.split(' ');
    if (cl.origin != defaultSearch.origin && splitText[0] != 's') {
      runCommands(query);
    }
  }, { url: [{ urlContains: defaultSearchPath }] }
);

// tab activated
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    currentLocation = tab.url;
  });
});

// tab updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo['url']) {
    currentLocation = changeInfo['url'];
  }
});

function suggestChildNodes(node, suggestions, commands, ancesterTitle, depth) {
  // if we're missing something, return empty array
  if (!node || !node.children || !suggestions || !commands) {
    return [];
  }

  // don't add command node to command name
  if (node.title != commandNode.title)
    ancesterTitle = ancesterTitle.concat(node.title + ".");

  if (depth < 1) {
    // first time only
    node.children.forEach(child => {
      var term = commands.split('.')[0];
      var childTitle = child.title.toLowerCase().split(' ')[0];
      var childFullPath = ancesterTitle + child.title.toLowerCase();
      var cfpSlice = childFullPath.slice(0, commands.split('').length);
      if (term == childTitle || cfpSlice == commands) {
        if ('url' in child)
          // we found a link, add it
          suggestions.push({ content: child.url + " ", description: "<url><match>" + ancesterTitle + child.title.split('-')[0] + "</match></url> - " + child.title.split('-')[1] });
        else {
          depth = depth + 1;
          suggestChildNodes(child, suggestions, commands, ancesterTitle, depth);
        }

      }
    })
  } else {
    node.children.forEach(child => {
      var childFullPath = ancesterTitle + child.title.toLowerCase();
      var cfpSlice = childFullPath.slice(0, commands.split('').length);
      if (cfpSlice == commands && 'url' in child)
        // we found a link, add it
        suggestions.push({ content: child.url + " ", description: "<url><match>" + ancesterTitle + child.title.split('-')[0] + "</match></url> - " + child.title.split('-')[1] });
      else {
        depth = depth + 1;
        suggestChildNodes(child, suggestions, commands, ancesterTitle, depth);
      }
    })
  }
  return suggestions;
}

// omnibar input change
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  var suggestions = [];

  // get the bookmark command suggestions
  var bookmarkCommandSuggestions = suggestChildNodes(commandNode, suggestions, text, "", 0);
  bookmarkCommandSuggestions.forEach(function (s) {
    suggestions.push(s);
  });

  // get the switch suggestions
  allSwitches.forEach(function (s) {
    if (s[1].indexOf(text.split('')[0]) != -1) {
      suggestions.push({ content: s[0] + " ", description: "<url><match>" + s[1] + "</match></url> or " + s[2] });
    }
  });


  // suggest    
  suggest(suggestions);
});

// bookmarks
chrome.bookmarks.onCreated.addListener(function (id, node) {
  refreshCommandNode();
});
chrome.bookmarks.onChanged.addListener(function (id, node) {
  refreshCommandNode();
});
chrome.bookmarks.onRemoved.addListener(function (id, node) {
  refreshCommandNode();
});
chrome.bookmarks.onMoved.addListener(function (id, node) {
  refreshCommandNode();
});