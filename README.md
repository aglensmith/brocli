# brocli
brocli is a Chrome extension that turns Chrome's omnibar into a command line interface for navigating the web

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