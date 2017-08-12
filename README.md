# brocli = browser + commandline interface
brocli is a Chrome extension that turns Chrome's omnibar into a command line interface for navigating the web.

## Installation
brocli is not available on the Chrome Web Store, so it must be side-loaded. To do so, first download the source code: 

* Download with git: `git clone https://github.com/aglensmith/brocli.git`
* or, [download zip file](https://github.com/aglensmith/brocli/archive/master.zip)

Once downloaded, the extension can be added here: `chrome://extensions`

* check `[] developer mode` at the top right. 
* click `Load unpacked extension...`
* file browse to and select `/brocli`

## Usage
* start brocli: In the addressbar, type `b` then press `space` or `tab`
* type command, then press enter
* tip: use keyboard shortcut `alt+d` to move cursor to addressbar. 

## AC Commands
If a domain is entered before the command, brocli will navigate to the page on that domain. If no domain is entered, brocli will use the tab's current location. For example:

* entering `-o 123` will navigate to the order edit of the site in the current tab.
* entering `store1234.mysparkpay.com -o 123` will navigate to store1234's order edit, regardless of current location.

Multiple entities or ids can be specified by comma seperating them. Ex: `-o 100219,100220` - opens order edit for `100219` in current tab and `100220` in a new tab. 

### Audit
* `cata (<ID>)` - category audit. Ex: `-cata 12`
* `-ca (<ID>)` - customer audit. Ex: 
* `-pa (<ID>)` - product audit. Ex: 
* `-oa (<ID>)` - order audit. Ex:  

### List
* `-l (page)` - navigate to an entity's list page. Ex:
* `-l categories`
* `-l orders` 
* `-l products`
* `-l sessions`
* `...`

### Edit
* `-cat (<id>)` - edit category. Ex `-cat 27`
* `-c (<id>)`- edit customer. Ex: `-c 12`
* `-d (<id>)` - edit discount. Ex: `-d 42`
* `-cat (<id>)` - edit category. Ex: `-cat 34`
* `-o (<id>)` - edit order. Ex: `-o 10006`
* `-p (<id>)` - edit product. Ex: `-p 27`

### View
* `-catv (<id>)` - cat view. Ex: `-ov 100231`
* `-ov (<id>)` - order view. Ex: `-ov 100231`
* `-eh (<id>)` - view customer email history. Ex: `-eh 227`
* `-vs (<id>)` - view visitor session. Ex: `-vs 100231`

## General Web Commands
Commands that are useful on any site.

### Navigation
* `--new-tab` or `-t` - specifies navigation should occur in new tab. Default is current tab. 