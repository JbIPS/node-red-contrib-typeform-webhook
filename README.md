# node-red-contrib-typeform-webhook
A NodeRED node that receive new Typeform submission a output an opiniated object

## Install
Install from npm
```
npm install node-red-contrib-cloud-firestore
```
Install from the palette manager
```
node-red-contrib-cloud-firestore
```

## Config
### Path
This is the path that will be listening to incoming webhook. It must be identical (but without the host part) to the one you give Typeform.

## Setup a webhook in Typeform
Go to your Typeform workspace, open a form and go to the `Connect` header, then `Webhooks` tab. Click `Add a webhook` and give your NodeRED domain followed by the path you set in your node.

You can get more infos on the webhook API in the [official documentation](https://developer.typeform.com/webhooks/)

## Good practice
This node will output a single object containing all the answers with their reference as key. To get a usable object, don't forget to set reference in all your questions in Typeform
