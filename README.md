![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Link Tool

Link Block for the [Editor.js](https://codex.so/editor).

![](assets/gif/demo.gif)

## Features

Allows adding link previews to your articles.

**Note:** this Tool requires server-side implementation for link data fetching. See [backend response format](#server-format) for more details.

## Installation

Get the package

```shell
yarn add @editorjs/link
```

Include module at your application

```javascript
import LinkTool from '@editorjs/link';
```

Optionally, you can load this tool from CDN [JsDelivr CDN](https://cdn.jsdelivr.net/npm/@editorjs/link@latest)

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
const editor = EditorJS({
  ...

  tools: {
    ...
    linkTool: {
      class: LinkTool,
      config: {
        endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching,
        createOnPaste: true, // true to catch non-image pasted links and create a preview automatically
        key: 'linkTool', // Required if createOnPaste is true - must match the tool key
      }
    }
  },

  ...
});
```

## Config Params

Link Tool supports these configuration parameters:

| Field    | Type        | Description                                    |
| ---------|-------------|------------------------------------------------|
| endpoint | `string`    | **Required:** the endpoint for link data fetching. |
| headers | `object`    | **Optional:** the headers used in the GET request. |
| createOnPaste | `boolean`    | **Optional:** true to catch non-image pasted links and create a preview automatically. |
| key | `string`    | **Optional:** Required if createOnPaste is true - must match the tool key. |

## Output data

This Tool returns `data` with following format

| Field          | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| link           | `string`  | Pasted link's url               |
| meta           | `object`  | Fetched link's data. Any data got from the backend. Currently, the plugin's design supports the 'title', 'image', and 'description' fields. |

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

You can implement a backend for link data fetching your own way. It is a specific and trivial task depending on your
environment and stack.

Backend response **should** cover following format:

```json5
{
    "success" : 1,
    "link": "https://codex.so", // Optionally return a link to set the hyperlink URL
    "meta": {
        // ... any fields you want
    }
}
```

**success** — uploading status. 1 for successful, 0 for failed

**link** - Optional response parameter to override the URL provided

**meta** — link fetched data.

Currently, the plugin's design supports the 'title', 'image', and 'description' fields. They should have the following format in the response:

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

Also, it can contain any additional fields you want to store.

# About CodeX

<img align="right" width="120" height="120" src="https://codex.so/public/app/img/codex-logo.svg" hspace="50">

CodeX is a team of digital specialists around the world interested in building high-quality open source products on a global market. We are [open](https://codex.so/join) for young people who want to constantly improve their skills and grow professionally with experiments in cutting-edge technologies.

| 🌐 | Join  👋  | Twitter | Instagram |
| -- | -- | -- | -- |
| [codex.so](https://codex.so) | [codex.so/join](https://codex.so/join) |[@codex_team](http://twitter.com/codex_team) | [@codex_team](http://instagram.com/codex_team/) |
