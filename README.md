- [Installing](#installing)
- [Usage](#usage)
- [Bookmark Commands](#bookmark-commands)
- [Other Commands](#other-commands)

brocli lets you use your browser bookmarks like a command line command from chrome's ombnibox.

brocli (short for "browser command-line interface) is a browser extension that turns Google Chrome's omnibar into a command-line interface for performing operations and navigating the web.

## Installing
* Install extension here: https://chrome.google.com/webstore/detail/brocli/bllmhobhpnfeojdbajmnnoahgakengjk

## Usage
In chrome's addressbar (AKA "omnibox"), type `b` then press `space` or `tab` to
* type a command, then press enter

> ### Tip
> * use keyboard shortcut `alt+d` to move cursor to addressbar. 

## Bookmark Commands

## Other Commands

|Command|Alias|Description|
|-|-|-|
|`--new-tab`|`-t`|specifies navigation should occur in new tab. Default is current tab|
|`--command [<STRING>]`|`--com [<string>]`|Search bookmarks for string and navigate to them if found (also ran on first input string if no other commands are executed|
|`--pretty-print [<STRING>]`|`--pp [<STRING>]`|Pretty print XML or HTML. Opens new tab to a extension's output.html|
|`--url-encode [<STRING>]`|`--url [<STRING]>`|Url encode a string. Opens new tab to a extension's output.html.|
