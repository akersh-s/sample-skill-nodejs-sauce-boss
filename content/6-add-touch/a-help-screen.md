---
pre: "a. "
title: Adding the TouchWrapper
weight: 1
---

**4.1.** Add TouchWrapper to Rectangular Devices

**Identify existing layout object.**

First, recall that our sauces on the Launch Screen all are using a
custom layout called "SauceListItem", which will display the image and
text for the sauce. Identify that in the launchrequest.json (let’s first
start with the non-Echo Spot
devices):

``` json
"when": "${@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge || @viewportProfile == @tvLandscapeXLarge}",
"type": "Container",
"direction": "column",
"width": "25vw",
"height": "30vh",
"alignItems": "center",
"items": [{
        "type": "Image",
        "source": "${imgSrc}",
        "width": "22vh",
        "borderRadius": "22vh",
        "height": "22vh",
        "scale": "best-fill"
    },
    {
        "type": "Text",
        "text": "${sauce}",
        "width": "25vw",
        "height": "8vh",
        "paddingTop": "2vh",
        "fontSize": "2.5vw",
        "fontWeight": "100",
        "textAlign": "center"
    }
]
```

We need to add a TouchWrapper
(<https://developer.amazon.com/docs/alexa-presentation-language/apl-touchwrapper.html>)
to support touch/press. We need to wrap the container above with a Touch
Wrapper.

**Adding a TouchWrapper and setting the Container as a child
item.**

``` json
"when": "${@viewportProfile == @hubLandscapeMedium || @viewportProfile == @hubLandscapeLarge || @viewportProfile == @tvLandscapeXLarge}",
"type": "TouchWrapper",
"id": "touch-${sauce}",
"item": {
    "type": "Container",
    "direction": "column",
    "width": "25vw",
    "height": "30vh",
    "alignItems": "center",
    "items": [
        {
            "type": "Image",
            "source": "${imgSrc}",
            "width": "22vh",
            "borderRadius": "22vh",
            "height": "22vh",
            "scale": "best-fill"
        },
        {
            "type": "Text",
            "text": "${sauce}",
            "width": "25vw",
            "height": "8vh",
            "paddingTop": "2vh",
            "fontSize": "2.5vw",
            "fontWeight": "100",
            "textAlign": "center"
        }
    ]
}
```

Note that we added a component id as well using the databinding for teh
current sauce. Now we need to set the onPress property onto the
TouchWrapper:

**4.2.** Add onPress property to determine what data to send back

**Add onPress property to the TouchWrapper component.**

``` json
"onPress": {
    "type": "SendEvent",
    "arguments": [
        "${sauce}"
    ]
}
```

**4.3.** Let’s test this in the authoring tool. Make sure you save your
launchrequest.json and click Deploy. Now go to the Test Tab, open the
skill and try cliking on one of the sauces. It should show that there
was a User Event but the command was not recognized. This is expected\!
Let’s look at our skill logs to see what kind of event was set.

![Testing the skill without an Event Handler
set](/images/a4-4.3-touchEvent-noHandler.gif)

**4.4.** Go back to the code tab, and then click on CloudWatch logs.
Check your latest log and the most recent REQUEST object. Open it and
scroll down to the request object. It should look something like the
below.

![Checking CloudWatch logs](/images/a4-4.4-checkLogs.gif)

**Format of Touch Request object.**

``` json
"request": {
    "type": "Alexa.Presentation.APL.UserEvent",
    "requestId": "amzn1.echo-api.request.2908225d-4e7c-4329-9ae9-26bab066e5c1",
    "timestamp": "2018-11-16T21:22:31Z",
    "locale": "en-US",
    "arguments": ["Pesto"],
    "components": {},
    "source": {},
    "token": ""
}
```

**4.5.** Now that we know what the touch request looks like, we need to
update our index.js to be able to handle this. In this case we want the
response for touching a specific sauce to be the same as saying it by
voice. We can use the RecipeHandler to also check if we have a touch
event and reuse the same logic. Go back to the Code tab and open
index.js.

**4.6.** Search the code for your first TODO: "TODO Activity 4: accept
Touch Event (Alexa.Presentation.APL.UserEvent)". Update this section to
add an OR conditional to also check for a touch event, which is a
request.type of "Alexa.Presentation.APL.UserEvent".

Now, when a touch event is sent, it should go to the RecipeHandler
function.

**4.7.** Now we need to add logic to take the sauce name that was
clicked and pass that on to our logic. Look for the second Activity 4
TODO: "TODO Activity 4: Support logic for Touch Request". Update the if
statement to check if the input was from a touch request and populate
the value of itemName from the request arguments passed in. See request
structure above if you are stuck help.

(Also remember that arguments is an array, and you need the first value
of the array).

**4.8.** Save, then deploy your index.js and try out the skill in the
test tab\! If all goes well you should be able to click on your desired
recipe and then it should load on the simulator with audio and karaoke
playing.

![Finished Product](/images/a4-4.7-finishedProduct.gif)

**4.9.** Don’t forget about the Echo Spot device\! Go back to the
launchrequest.json and find the other "when" conditional for the
hubRoundSmall - add a TouchWrapper to this just like you did previously
for the other screen sizes:

**Add the TouchWrapper for the hubRoundSmall viewportProfile.**

``` json
"when": "${@viewportProfile == @hubRoundSmall}",
"type": "Container",
"direction": "column",
"width": "50vw",
"height": "70vh",
"alignItems": "center",
"items": [{
        "type": "Image",
        "source": "${imgSrc}",
        "width": "50vh",
        "height": "50vh",
        "borderRadius": "5vh",
        "scale": "best-fill"
    },
    {
        "type": "Text",
        "text": "${ordinal}. ${sauce}",
        "width": "50vw",
        "height": "20vh",
        "paddingTop": "3vh",
        "fontSize": "5vw",
        "fontWeight": 100,
        "textAlign": "center"
    }
]
```

Save, Deploy, and retest\!

🏆Congratulations🏆\! At this point you’ve finished activity 4.
