# brocli = browser + commandline interface
brocli is a Chrome extension that turns Chrome's omnibar into a command line interface for navigating the web.

## Installation
brocli is not available on the Chrome Web Store, so it must be side-loaded. To do so, first download the source code: 

* Download with git: `git clone https://github.com/aglensmith/brocli.git`
* or, [download zip file](https://github.com/aglensmith/brocli/archive/master.zip)

Once downloaded, the extension can be added to chrome here: [chrome://extensions/](chrome://extensions/)

* check `[] developer mode` at the top right. 
* click `Load unpacked extension...`
* file browse to and select `/brocli`

## AC Commands

### Audit

### List
* `-l (page)` - navigate to an entity's list page. Ex:
* `-l categories`
* `-l orders` 
* `-l products`
* `-l sessions`

### Edit
* `-c (<id>)`- edit customer. Ex: `-c 12`
* `-d (<id>)` - edit discount. Ex: `-d 42`
* `-cat (<id>)` - edit category. Ex: `-cat 34`
* `-o (<id>)` - edit order. Ex: `-o 10006`
* `-p (<id>)` - edit product. Ex: `-p 27`

### View
* `-catv (<id>)` - cat view. Ex: `-ov 100231`
* `-ov (<id>)` - order view. Ex: `-ov 100231`
* `-vs (<id>)` - view visitor session. Ex: `-vs 100231`