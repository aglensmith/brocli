// check if the first arg is a bookmark
// if it is, do bookmark string replacement and navigation
// if there's a bookmark and params are multiple of %s's, then open all in new tabs


// if it is not...
// nav o 123

// o 123
// o 123 456
// url o 123 456
// hash o 123 456
// hash o 123 -t

// since there's always a 0 for bookmark commands, if we end up navigating in on 0, 
// then none of the options or other commands get used, ex: -new-tab

var vars = [
  'broclistr',
  '%s'
];

function replaceStrings(url, params) {
  url = res.url.replace('brocli.example.com', (new URL(currentLocation).hostname));
  params.forEach(function (p) {
    vars.forEach(function(v) {
      // LEFT OFF HERE
      url = url.replace(v, p);
      url = url.replace(v.concat(params.indexOf(p)), p);
    });
  });
  
  url = url.replace('broclistr', p)
  url = url.replace('broclistr'.concat(params.indexOf(p)), p);
  url = url.replace('%s', value);
  url = url.replace('%s'.concat(i), value);
  return url;
}

function hasVars(str) {
  vars.forEach(function (v) {
    if (str.includes(v)) {
      return true;
    }
  });
}

function runCommands(input) {


  // needed for when executing from addressbar without omnibar activation
  if (isUrl(input) && !hasVars(input))
    goTo(input);


  if (!brocliCommandFolderId)
    refreshCommandNode();

  // s.n -t <--- bookmark pth is [s, n]
  var bookmarkPath = input.split(' ')[0].split('.');

  // get url from bookmark
  var url = getBookmarkCommandUrl(bookmarkPath, 0, commandNode);

  if (url &&  !(url.includes('%s') || url.includes('broclistr'))) {
    // if we already have a full and don't need str replacement, go ahead and navigate
    goTo(url, false, value);
  } else {
    value = value.split('.')[0];
    chrome.bookmarks.search(value, function (results) {
      var bookmarkFound = false;
      results.forEach(function (res) {
        if (res.title.split(" ")[0] == value) {
          bookmarkFound = true;
          if ('url' in res) {
            url = res.url.replace('brocli.example.com', (new URL(currentLocation).hostname));
            value.split(' ').forEach(function (i) {
              if (value.split(' ').indexOf(i) != 0) {
                url = replaceStrings(res.url);
              }
            });
          }

          if (url && !(url.includes('%s') || url.includes('broclistr'))) {
            console.log('parser.on - has url');
            goTo(url);
          }
        }
      });
    });
  }
}