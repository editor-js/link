# Link Embed Tool for Codex Editor

This tool allowes to handle get information from pasted link

### Interface examples:

With Big Cover
![alt text](http://i.imgur.com/tYkGetc.png "Big cover")


With Small Cover
![alt text](http://i.imgur.com/BrW1qGr.png "Small cover")

# Installation

Link Embed plugin extends Codex Editor tools
There is different ways to use plugin

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
    },
    allowPasteHTML : true
}
```

```fetchURL``` - is important data. Plugin won't be initialized is you won't pass it
```defaultStyle``` - this item allows you to choose default embed style. By default it is ```smallCover```

# Backend requirements

Plugin wait the following data:

```javascript
{
    "image" : imageURL,
    "title" : embedTitle,
    "desciption" : embedDescription,
    "linkText" : link inscription,
    "linkUrl" : link path
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