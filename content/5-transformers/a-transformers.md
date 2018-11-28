---
pre: "a. "
title: Transformers
weight: 1
---

Transformers transform data in a data source into alternative
representations. Given a property in the data source, it performs the
tranformation and writes the data back to the property. In this
activity, we will be using the **textToHint** transformer to add a hint.

> **Note**
> 
> For this part of the activity, we will be updating our
> **LaunchRequest**'s APL Document.

**3.1.** In the APL Authoring Tool go to your **LaunchRequest** document
and click on ![Data JSON](/images/ui/data-json.png) and paste the following JSON:

**Data JSON with textToHint Transformer.**

``` JSON
{
	"sauceBossData": {
		"type": "object",
		"properties": {
			"hintString": "<<UPDATE ME HERE>>"
		},
		"transformers": [{
			"inputPath": "hintString",
			"transformer": "textToHint"
		}]
	}
}
```

By including the **textToHint transformer** to our data object, our skill
will now transform the `inputPath` into a hint that will display in the
footer when our skill launches. Next we will need to update our
`hintString` to a proper value.

**3.2.** In the code editor go to **line 5** for the hintString and update the value:

**Updating hintString (This goes in the properties of our data source.).**

``` JSON
"hintString": "How do I make pesto?"
```

![Adding the hintString
property](/images/a3-e03_02_add-hintString-property.gif)

Now that we’ve added the `hintString` property, we have to update our
**LaunchRequest** template’s footer to use it.

**3.3.** In the code editor click on ![start from
scratch](/images/ui/start-from-scratch.png) and look for the footerHint and
update the value with your new transformed hintString. The line should now look like the 
following **JSON** snippet.

**footerHint data-binding.**

``` JSON
"footerHint": "${payload.sauceBossData.properties.hintString}"
```

![Data binding the
hintString](/images/a3-e03_03_add-data-bind-hintString.gif)

At this point your template is ready to test on device\! It wont work in
the authoring tool so you'll need to update the CODE tab in the developer portal. 

**3.4.** Copy and paste the updated **LaunchRequest** template back into **launchrequest.json**. 

The [APL Authoring Tool]() allows you to visualize your document with hard-coded data. But we need
to source the data from our skill's code. To do that we need to update the **datasource** in our
**index.js** file.

**3.5.** Open your **index.js** you will need to update the datasources object with your **LaunchRequestHandler**. 
Your launch request should now look like. following:

``` javascript
    let response = handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require('./documents/launchrequest.json'),
        datasources: {
          "sauceBossData": {
            "type": "object",
            "properties": {
              "hintString": "How do I make pesto?"
            },
            "transformers": [{
              "inputPath": "hintString",
              "transformer": "textToHint"
            }]
          }
        }

      })
      .getResponse();
```

Remember to save all of your files and then hit Deploy before testing.

> **Important**
> 
> To test this you’ll need to use a device or the simulator.

> **Note**
> 
> The **textToHint** transformer is automatically figuring out the wake
> word and appending it to our hint. If you have a device, try changing
> the wake word and opening your skill to see it in action.
