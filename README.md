# Overview

The text editor component provided by Slate, is a versatile tool that will enable you to edit and style a text using a rich toolbar.

## Text editor component

![textEditor](https://github.com/metayoub/qodly_slate/blob/develop/public/textEditor.png)

### Properties

| Name     | Type    | Default | Description                                                                                                                                               |
| -------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| readOnly | boolean | False   | Setting it will control the editor's content readability. If it's set to true, then then content won't be editable, and the toolbar will be unaccessible. |

### Datasource

| Name       | Type | Required | Description                                                     |
| ---------- | ---- | -------- | --------------------------------------------------------------- |
| Datasource | Text | Yes      | Will contain the text that will be displayed inside the editor. |
