---
pre: "b. "
title: Bind data
weight: 2
---

At this point we have an APL Document that includes an image component
and a text component. It also supports small hub, medium hub, large hub
and extra large TV viewports. Our APL Document’s data, however, is
hardcoded so we still have some work to do. In this section we will add
a datasource to our APL Document and use data-binding to enable it to
handle showing recipes for all our sauces. Like a boss.

**2.10.** In the [APL authoring
tool](https://developer.amazon.com/alexa/console/ask/displays/) go to
**line 65** and paste the following **JSON** Snippet below on a new line:

``` JSON
"parameters": [
    "payload"
],
```

We just named our data binding object **payload**. You’ll see how this
all comes together in step **2.12.**.

![Pasting the datasource](/images/a2-e02_10_add-data-source.gif)

The APL Document is updated to indicate it’s using a data source. We now
need to add a the data.

**2.11.** Click on ![Data JSON](/images/ui/data-json.png) and paste the
following **JSON** snippet into the text editor.

``` JSON
{
    "sauceBossData": {
        "type": "object",
        "properties": {
            "selectedSauceText": "<speak>To make pizza sauce, mix together 1 can tomato sauce and 1 can tomato paste in a medium bowl until smooth. Stir in 1 tablespoon oregano, 1 1/2 teaspoons dried minced garlic, and 1 teaspoon paprika.</speak>",
            "selectedSauce": "pizza",
            "selectSauceCaps": "PIZZA",
            "selectedSauceImg": "https://s3.amazonaws.com/sauceboss/pizza-sauce-500x500.png",
            "hintString": "how do I make pesto?"
        }
    }
}
```

![Inserting the Data](/images/a2-e02_11_add-data.gif)