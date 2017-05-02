# Link Embed Tool for Codex Editor

This tool provides two interface types of Embeded links

## Interface examples:

### With Small Cover
![alt text](http://i.imgur.com/ofUxKF2.png "Small cover")


### With Big Cover
![alt text](http://i.imgur.com/LUaBCXw.jpg "Big cover")

---

# Installation

Plugin extends Codex Editor tools

There are different ways to use

### Install via npm

```javascript
npm install --save codex.editor.link
```

### From CDN

Add script and stylesheet to your HTML page

```
<script src="https://raw.githubusercontent.com/codex-editor/link/master/link.js"></script>
<link rel="stylesheet" href="https://raw.githubusercontent.com/codex-editor/link/master/link.css"></link>
```


### Or clone from Github

```
https://github.com/codex-editor/link.git
```

# Usage

Pass new tool to the ```codex.editor.start``` method in ```tools``` array:

```javascript
link: {
    type             : 'link',
    displayInToolbox : true,
    iconClassname    : 'cdx-link-icon',
    prepare          : cdxEditorLink.prepare,
    render           : cdxEditorLink.render,
    makeSettings     : cdxEditorLink.settings,
    save             : cdxEditorLink.save,
    destroy          : cdxEditorLink.destroy,
    config: {
        fetchURL: '/fetch',
        defaultStyle : 'bigCover'
    }
}
```

```fetchURL``` - is important data. Plugin won't be initialized is you won't pass it

```defaultStyle``` - this item allows you to choose default embed style. By default it is ```smallCover```

# Data requirements

Plugin waits from server the following data:

```javascript
{
    "image" : "imageURL",
    "title" : "embedTitle",
    "desciption" : "embedDescription",
    "linkText" : "link inscription",
    "linkUrl" : "link url"
}
````

# CodeX Editor

API oriented, open-source, block-styled Editor.

https://github.com/codex-team/codex.editor

# Authors

We are small and very ambitious team of Web-developing fans consisting of IFMO students and graduates located in St. Petersburg, Russia.
Feel free to give us a feedback on team@ifmo.su

https://ifmo.su

Follow us!

VK: https://vk.com/codex_team

Telegram: https://t.me/codex_team

Instagram: https://www.instagram.com/codex_team