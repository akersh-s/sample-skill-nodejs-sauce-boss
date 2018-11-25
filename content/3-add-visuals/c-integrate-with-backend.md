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
into this newly created file.

**1.16** Now open `index.js` and find the `lauchRequestHandler`. Find
the `responsebuilder` API. It should be starting around `line 57`. Copy
and paste the following directive in line.

**Add the APL directive.**

``` javascript
.addDirective({ 
    type : 'Alexa.Presentation.APL.RenderDocument', 
    version: '1.0',
    datasources: recipes, 
    document: require('./documents/launchrequest.json') 
})
```

  - SDK method to add a custom directive.

  - Directive definition sent to the Alexa service.

  - Source from which data can be bound to the APL document. This can be
    dynamic as well.

  - Location of APL Document itself.

> **Note**
> 
> Your final code should look something like this:

**Final Response Builder API.**

``` javascript
let response = handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .addDirective({
            type : 'Alexa.Presentation.APL.RenderDocument',
            datasources: recipes,
            document: require('./documents/launchrequest.json')
        })
    .getResponse();

return response;
```

**1.17.** Hit Save.