---
pre: "c. "
title: Integrate APL with backend
weight: 3
---

**1.13.** Awesome work\! You’ve successfully used the **APL Authoring
Tool** to build a document. Now we’re going to integrate it with our
skill code. Switch back to single pane view and Copy this entire json
document. We’re going to be pasting this into your skill.

**1.14.** Open your skill code in the Developer Portal.

**1.15** In the documents folder, open **launchrequest.json** that we
created earlier and paste the document from the **APL Authoring Tool**
into this file.

**1.16** Now open `index.js` and find the `lauchRequestHandler`. Find
the `responsebuilder` API. It should be around `line 73`. 
Uncomment directive that has the same basic elements as the following code snippet.

**Add the APL directive.**

``` javascript
.addDirective({ 
    type : 'Alexa.Presentation.APL.RenderDocument', 
    datasources: recipes, 
    document: require('./documents/launchrequest.json') 
})
```

  - SDK method to add a custom directive.

  - `type` is the Directive definition sent to the Alexa service.

  - `datasources` are the source from which data can be bound to the APL document. This can be
    dynamic (i.e. populated from an API call).

  - `document` is the location of APL Document itself.

> **Note**
> 
> Your final code should look something like this:

**Final Response Builder API.**

``` javascript
    let response = handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./templates/launchrequest.json'),
        datasources: {
          "sauceBossData": {
            "type": "object",
            "properties": {
              "hintString": "How do I make barbecue sauce?"
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

**1.17.** Hit Save and Deploy!

We've now added the integrated the APL Document with your skill's Launch Request!