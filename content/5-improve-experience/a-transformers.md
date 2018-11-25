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
and click on ![Data JSON](/images/ui/data-json.png) and on **line 10**
paste the following after the `}`.

**textToHint Transformer.**

``` JSON
,
"transformers": [
    {
        "inputPath": "hintString",
        "transformer": "textToHint"
    }
]
```

![Adding the textToHint transformer to the data
object](/images/a3-e03_01_add-textToHint-transformer.gif)

By adding the **textToHint transformer** to our data object, our skill
will now transform the `inputPath` into a hint that will display in the
footer when our skill launches. Next we will need to define our
`hintString`.

**3.2.** In the code editor go to **line 9** and paste the following
code below it. Be sure to add a comma `,` to the end of **line 9**.

**hintString (This goes in the properties of our data source.).**

``` JSON
"hintString": "how do I make pesto?"
```

![Adding the hintString
property](/images/a3-e03_02_add-hintString-property.gif)

Now that we’ve added the `hintString` property, we have to update our
**LaunchRequest** template’s footer to use it.

**3.3.** In the code editor click on ![start from
scratch](/images/ui/start-from-scratch.png) go to **line 303** and
replace it with the following **JSON** snippet.

**footerHint data-binding.**

``` JSON
"footerHint": "${payload.sauceBossData.properties.hintString}"
```

![Data binding the
hintString](/images/a3-e03_03_add-data-bind-hintString.gif)

At this point your template is ready to test on device\! It wont work in
the simulator so be sure to copy and paste the **LaunchRequest**
template and the data into your skill code files and deploy it.

> **Important**
> 
> To test this you’ll need to use a device or the simulator.

> **Note**
> 
> The **textToHint** transformer is automatically figuring out the wake
> word and appending it to our hint. If you have a device, try changing
> the wake word and opening your skill to see it in action.
