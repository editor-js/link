![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Link Tool

Link Block for the [Editor.js](https://codex.so/editor).

![](assets/gif/demo.gif)

## Features

Allows to add link previews to your articles.

**Note:** this Tool requires server-side implementation for link data fetching. See [backend response format](#server-format) for more details.

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @editorjs/link
```

Include module at your application

```javascript
const LinkTool = require('@editorjs/link');
```

### Download to your project's source dir

1. Download folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/link).

`https://cdn.jsdelivr.net/npm/@editorjs/link@2.0.0`

Then require this script on page with Editor.js through the `<script src=""></script>` tag.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
      }
    }
  }

  ...
});
```

## Config Params

Link Tool supports these configuration parameters:

| Field    | Type        | Description                                    |
| ---------|-------------|------------------------------------------------|
| endpoint | `string`    | **Required:** endpoint for link data fetching. |

## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| link           | `string`  | Pasted link url                 |
| meta           | `object`  | Fetched link data. Any data got from backend. Currently title, image and description are supported by plugin's design. |

```json
{
    "type" : "linkTool",
    "data" : {
        "link" : "https://codex.so",
        "meta" : {
            "title" : "CodeX Team",
            "site_name" : "CodeX",
            "description" : "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
            "image" : {
                "url" : "https://codex.so/public/app/img/meta_img.png"
            }
        }
    }
}
```

## Backend response format <a name="server-format"></a>

You can implement backend for link data fetching your own way. It is a specific and trivial task depending on your
environment and stack.

Backend response **should** cover following format:

```json5
{
    "success" : 1,
    "meta": {
        // ... any fields you want
    }
}
```

**success** — uploading status. 1 for successful, 0 for failed

**meta** — link fetched data. 

Currently title, image and description fields are supported by plugin's design . They should have the following format in the response:
```json5
{
    "success" : 1,
    "meta": {
        "title" : "CodeX Team",
        "description" : "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
        "image" : {
            "url" : "https://codex.so/public/app/img/meta_img.png"
        }
    }
}
```
Also, can contain any additional fields you want to store. 
