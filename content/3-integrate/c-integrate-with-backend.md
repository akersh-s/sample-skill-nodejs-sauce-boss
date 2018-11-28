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

**1.16** Now open `index.js` and find the `LaunchRequestHandler`. Find
the `responsebuilder` API. It should be around `line 73`. 
paste the following code directive below the comment that says 
`//TODO YOU WILL ADD CODE FROM ACTIVITY 1 HERE`.

**Add the APL directive.**

``` javascript
.addDirective({ 
    type : 'Alexa.Presentation.APL.RenderDocument', 
    document: require('./documents/launchrequest.json'),
    datasources: {} 
})
```

  - SDK method to add a custom directive.

  - `type` is the Directive definition sent to the Alexa service.

  - `datasources` are the source from which data can be bound to the APL document. This can be
    dynamic (i.e. populated from an API call). We're going to leave this empty for now.

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
        document: require('./documents/launchrequest.json'),
        datasources: {}
      })
      .getResponse();
```

**1.17.** Hit Save and Deploy!

We've now added the integrated the APL Document with your skill's Launch Request!
