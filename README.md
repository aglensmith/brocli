- [Key Features](#key-features)
- [Installing](#installing)
- [Usage](#usage)
- [Bookmark Commands](#bookmark-commands)
- [Terminal](#terminal)
- [Options](#options)
- [Command Reference](#command-reference)

# brocli

Chrome extension that turns chrome's address bar into a command line interface for navigating the web and rapidly performing common IT related tasks.

## Key Features

Command aliases for quickly navigating to bookmarked pages:

![]()

Utility commands to rapidly perform IT and development related tasks:

![]()

Built-in terminal:

![]()

## Installing
* Install extension here: https://chrome.google.com/webstore/detail/brocli/bllmhobhpnfeojdbajmnnoahgakengjk

## Usage
In chrome's address bar, type `b` then press `space` or `tab`, type a command, then press enter:

![Pretty Print GIF]()

> ### Tip
> * use keyboard shortcut `alt+d` to move cursor to addressbar.

## Bookmark Commands

## Terminal

## Options

|Option|Description|
|-|-|
|Execute commands directly from addressbar|Enter commands into address bar without typing `b + space` first|
|Default search url||
|Command folder id|The ID of the bookmark folder where brocli should look for bookmark commands|

## Command Reference

|Command|Alias|Description|
|-|-|-|
|`--new-tab`|`-t`|specifies navigation should occur in new tab. Default is current tab|
|`--command [<STRING>]`|`--com [<string>]`|Search bookmarks for string and navigate to them if found (also ran on first input string if no other commands are executed|
|`--pretty-print [<STRING>]`|`--pp [<STRING>]`|Pretty print XML or HTML. Opens new tab to a extension's output.html|
|`--url-encode [<STRING>]`|`--url [<STRING]>`|Url encode a string. Opens new tab to a extension's output.html.|
