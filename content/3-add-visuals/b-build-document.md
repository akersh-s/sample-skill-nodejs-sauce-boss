---
pre: "b. "
title: Build an APL Document
weight: 2
---


**1.1** Open the code tab in the **Amazon Developer Portal**.

**1.2.** Click the new folder button to create a new folder called
**documents** inside the **lambda/custom** directory.

> **Note**
> 
> We will save all of our APL documents into this folder. Technically we
> can save our APL Documents any where, but it’s a best practice to
> separate them from your coding logic.

**1.3.** Create a new file called **launchrequest.json** in your newly
created **documents** folder. We’ll come back to fill this out later
with the resulting document from the APL Authoring Tool.

**1.4.** In a new browser tab, open the **APL Authoring Tool**. You can
do so by selecting the option for **Display** on the left hand
navigation of the **Build** tab, or you can click this link:
\[<https://developer.amazon.com/alexa/console/ask/displays>\]

**1.5** On the Authoring Tool. Select **Start from Scratch**.

**1.6** Slide the toggle from the Triple Pane Editor to the Single Pane
View.

**Before:** ![Layout View](/images/ui/toggle-layout-view.png) **After:**
![Code View](/images/ui/toggle-code-view.png)

> **Note**
> 
> Now we have a scratch APL Document. Let’s learn about all the elements
> that compose one.

**The fundamental elements of an empty APL document..**

``` json
{
    "type": "APL",
    "version": "1.0",
    "theme": "dark", 
    "import": [], 
    "resources": [], 
    "styles": {}, 
    "layouts": {}, 
    "mainTemplate": { 
        "items": []
    }
}
```

  - The `theme` reflects the basic color scheme in use on the device,
    options here are dark or light.

  - `Import` allows reference of external styles, resources, or layouts
    to be used by your APL document.

  - `Resources` are a constant used when drawing text, images, and
    layouts on the screen. Using a named constant allows reuse of an APL
    document across different devices by providing per-device resources.

  - `Styles` are a collection of state-dependent resources. For example,
    the flatButton style defines the size, background color, text color,
    border color, border width, and border radius of one type of button
    for the "normal", "pressed", "focused", and "disabled" states. All
    APL components have a clearly documented list of styled properties.

  - `Layouts` are composed of visual components. Portions of the layout
    can be dependent on the screen size/shape or and may include other
    layouts

  - The `mainTemplate` property is a pre-defined layout. This is the
    layout that will be inflated when the APL document is first
    instantiated on the screen.

**1.7.** Copy and Paste this following block of code into the document
window. You should see a simulation of the APL Document in the viewport
window\!

> **Important**
> 
> Akersh\! update the above text to link to the actual file once it’s
> found it’s final resting place.

> **Note**
> 
> We can preview how the document will look across different devices by
> manipulating the viewport in the APL Authoring Tool. Viewports can be
> changed from small round, medium, large, and extra large and layouts
> can be optimized for each of these viewports. It’s best practice to
> start developing with the smallest form factor.

**1.8.** Switch the viewport from Medium Hub to Small Round Hub.

Notice how the background is missing on the small hub but it was present
on the medium hub? This is an example of dynamic layouts based on the
viewport. Let’s go ahead and add this background.

> **Note**
> 
> We can set dynamic resources by setting a condition with the `when`
> parameter.

**1.9.** Scroll down to `resources` on `line 19`. Copy and paste the
following code block into the array on `line 20`:

**Add the Background Resource to the Small Round Hub.**

``` json
{
    "description": "Sauce boss background image assets",
    "when": "${@viewportProfile == @hubRoundSmall}", 
    "strings": { 
        "backgroundBottom": "https://s3.amazonaws.com/sauceboss/sauceBoss-background-bottom-smHub.png",
        "backgroundLeft": "https://s3.amazonaws.com/sauceboss/sauceBoss-background-left-smHub.png",
        "backgroundRight": "https://s3.amazonaws.com/sauceboss/sauceBoss-background-right-smHub.png",
        "backgroundSecret": "https://s3.amazonaws.com/sauceboss/sauceBoss-background-secret-smHub.png"
    }
}
```

  - Using a `when` parameter allows us to specify when a resource is
    active based on a certain condition. In this case, when the viewport
    is on the smallest hub, our background images will be sourced from
    these locations.

  - These images are optimized for display on a round small hub. A good
    practice is to have assets optimized for the the different viewport
    profiles.

Now we can see what the screen looks like on different device types by
changing our viewport so that we can simulate what the visual experience
on different form factors. Looks like the header and footers are missing
as well.

Let’s edit the header first.

**1.10.** Toggle the slider from single pane view to triple plane view.

**1.11.** Click through the elements to find the `alexaHeader` type.
Hint: This should be in the second container as the first item.

> **Note**
> 
> Notice how all the elements are nested? Using this nesting structure
> we can create a variety of custom screen types.

**1.12.** You should see three attributes in the main editing window:
`type`, `headerTitle` and `headerAttributionImage`. Fill out the
`headerTitle` and `headerAttributionImage` following the example below:

``` json
    {
        "type": "AlexaHeader",  
        "headerTitle": "WELCOME TO SAUCE BOSS", 
        "headerAttributionImage": "@skillIcon" 
    },
```

  - This is the header layout, which is defined by passing `AlexaHeader`
    as the type. This is a pre-defined APL layout that is included as a
    part of our import `alexa-layouts`. The benefit of using pre-defined
    APL layouts is that the design will have full support of all
    viewport sizes.

  - The header layout gives us the `headerTitle` parameter. This
    parameter sets the title of the header.

  - The header layout also gives us the `headerAttributionImage`
    parameter. This parameter allows you to change a standard
    attribution image. Right now it’s set to `@skillIcon` which is a
    transformer for receiving the skill icon. We’ll learn more about
    transformers in Activity III.
