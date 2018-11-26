---
pre: "c. "
title: Access the data
weight: 3
---

Now that we have completed databinding our APL Document to a datasource,
we will use **binding paths** to access the data. A **binding path** is
based on our data’s structure. For example, to access the sauce image,
we would access it with:

`sauceBossData.properties.selectedSauceImg`

In our APL Document, we defined our data binding object to be called
**payload** so in order to access the data from our Document, the
**binding path** becomes:

`payload.sauceBossData.properties.selectedSauceImg`

Let’s update our Document to use the **binding path**.

**2.12.** In the APL Authoring Tool select **Small Hub**, click on
![start from scratch](/images/ui/start-from-scratch.png) and navigate to
**line 84** and replace it with the following:

``` JSON
"source": "${payload.sauceBossData.properties.selectedSauceImg}",
```

> **Note**
> 
> The sauce image in now shown dynamically based on the customer’s
> selection.

![Adding the small hub sauce image binding
path](/images/a2-e02_12_add-data.gif)

The image is now dynamic. We’ll use the same process to make the rest of
our component’s data dynamic.

**2.13.** In the code editor go to **line 101** and paste the following
**JSON**.

``` JSON
"headerTitle": "HOW TO MAKE ${payload.sauceBossData.properties.selectSauceCaps} SAUCE",
```

![Binding the small hub header text binding
path](/images/a2-e02_13_add-small-hub-header-text.gif)

**2.14.** In the code editor go to **line 127** and paste the following
**JSON**.

``` JSON
"text": "${payload.sauceBossData.properties.selectedSauceText}",
```

![Binding the small hub sauce
text](/images/a2-e02_14_add-small-hub-sauce-text.gif)

> **Note**
> 
> At this point the Document is only using data binding for the small
> hub. In the next two steps, we’ll update the components that display
> on the **medium**, **large**, and **extra large TV** viewports. Like a
> boss.

**2.15.** Select **Medium Hub** and in the code editor go to **line
148** and replace the hardcoded value with the following **JSON**.

``` JSON
"source": "${payload.sauceBossData.properties.selectedSauceImg}",
```

![Binding the medium hub sauce
image](/images/a2-e02_15_add-medium-hub-sauce-image.gif)

**2.16.** In the code editor, go to **line 164** and replace the
hardcoded value with the **JSON** below.

``` JSON
"text": "${payload.sauceBossData.properties.selectedSauceText}",
```

![Binding the medium hub sauce
text](/images/a2-e02_16_add-medium-hub-sauce-text.gif)

 Now that you've finished editing your **RecipeIntent**'s APL Document, it's time to save it in the
 code editor.

**2.17** In the code editor, create **documents/recipeintent.json**.

**2.18** Go the **APL Authoring Tool** and copy your document.

**2.19** Paste the code into your **documents/recipeintent.json** and save

**2.20** Click deploy.