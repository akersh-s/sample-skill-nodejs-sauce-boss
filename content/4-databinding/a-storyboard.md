---
pre: "a. "
title: Build the document
weight: 1
---

> **Note**
> 
> For this part of the activity, we will be creating and updating our
> **RecipeIntent**'s APL Document.
> Make sure that you have saved any changes you've made in the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays/) to your **launchrequest.json** APL Document.

**2.1.** First start by opening up the [APL authoring
tool](https://developer.amazon.com/alexa/console/ask/displays/).

**2.2.** Click ![start from
scratch](/images/ui/button-start-from-scratch.png)

**2.3.** Slide the toggle from the Triple Pane Editor to the Single Pane
View.

**Before:** ![Layout View](/images/ui/toggle-layout-view.png) **After:**
![Code View](/images/ui/toggle-code-view.png)

**2.4.** Paste the [starter template](https://raw.githubusercontent.com/akersh-s/sample-skill-nodejs-sauce-boss/master/workshop/a2/activity2-recipeintent-before.json)
into the code editor.

![Steps 2.1 to 2.4](/images/a2-e02_01-05.gif)

At this point we’ve created an APL Document that has an
Alexa header hardcoded to **How to make Pizza Sauce**.

Let’s add a few additional components for when a user says, "tell me
more about pizza sauce." We want to show an image of the sauce and the
recipe. Next we will add an image component and text component to our
APL Document. Let’s start with the image component.

**2.5** In the code editor, go to **line 77**, and on a new line paste the following
**JSON** snippet into your template.

**Image Component.**

``` JSON
{
    "when": "${@viewportProfile == @hubRoundSmall}", 
    "type": "Image",
    "source": "https://s3.amazonaws.com/sauceboss/pizza-sauce-500x500.png",
    "scale": "best-fill",
    "width": "100vw",
    "height": "100vh",
    "position": "absolute",
    "overlayColor": "rgba(0, 0, 0, 0.6)",
    "scrim": true
},
```

  - The `when` property allows you to apply conditions to components.
    You can read it as, "when x is true, display following". In this
    case, we will display the component on a **small hub**.

![Pasting the image component](/images/a2-e02_05-add-image-component.gif)

Now that we’ve added the image component, we’ll add our text component
which we will also wrap in a scroll view.

**2.6.** In the code editor scroll to line 109 and paste the following
**JSON** snippet into the **items** empty array block [].

**Text component wrapped in a ScrollView.**

``` JSON
{
    "type": "ScrollView",
    "width": "100vw",
    "height": "100vh",
    "item": {
        "type": "Container",
        "direction": "column", 
        "alignItems": "center",
        "paddingLeft": 30,
        "paddingRight": 30,
        "paddingBottom": 350,
        "items": [
            {
                "type": "Text",
                "text": "To make pizza sauce, mix together 1 can tomato sauce and 1 can tomato paste in a medium bowl until smooth. Stir in 1 tablespoon oregano, 1 1/2 teaspoons dried minced garlic, and 1 teaspoon paprika.",
                "width": "75vw",
                "textAlign": "center",
                "fontSize": "7vh",
                "fontWeight": "300",
                "id": "recipeText",
                "style": "textStyleKaraoke"
            }
        ]
    }
}
```

  - **direction** - Sets the direction of the scroll view. **Column**
    scrolls left and right while **vertical** scrolls up and down.

![Pasting the text component](/images/a2-e02_06-add-text-component.gif)

> **Note**
> 
> We’ve only added the image component and the text component to the
> **small hub** viewport. We now need to add them to our medium and
> large hub viewports. Since these two are both similar enough we will
> only need to define this once.

**2.7.** In the code editor, click on the dropdown above the preview
pane and select **Medium Hub**.

![viewport selector](/images/ui/dropdown-viewport-selector.png)

**2.8.** In the code editor, go to **line 142** and insert the following
**JSON** snippet into the **items** empty array block [].

**Large hub image component.**

``` JSON
{
    "type": "Image",
    "source": "https://s3.amazonaws.com/sauceboss/pizza-sauce-500x500.png",
    "width": "50vh",
    "borderRadius": "50vh",
    "height": "50vh",
    "scale": "best-fit"
}
```

![Pasting medium hub image
component](/images/a2-e02_08-add-image-component-large.gif)

**2.9.** In the code editor, go to **line 152** and paste the following
**JSON** snippet on the next line.

``` JSON
,{
    "type": "ScrollView",
    "paddingLeft": "5vw",
    "width": "60vw",
    "height": "60vh",
    "item": {
        "type": "Container",
        "items": [
            {
                "type": "Text",
                "text": "To make pizza sauce, mix together 1 can tomato sauce and 1 can tomato paste in a medium bowl until smooth. Stir in 1 tablespoon oregano, 1 1/2 teaspoons dried minced garlic, and 1 teaspoon paprika.",
                "fontSize": "6vh",
                "fontWeight": "300",
                "id": "recipeText",
                "style": "textStyleKaraoke"
            }
        ]
    }
}
```

> **Note**
> 
> Make sure to paste the snippet after the `}` on **line 152**. Otherwise
> the **JSON** will be malformed which will throw an error.

![Pasting the medium hub text
component](/images/a2-e02_09-add-text-component-large.gif)