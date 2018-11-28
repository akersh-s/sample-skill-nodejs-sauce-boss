---
pre: "b. "
title: Speech Synchronization
weight: 2
---

Let’s further enhance our experience for our customers. When our skill
reads the sauce recipe aloud, some of our customers may wish to read
along. To make that easier on their eyes we can use **Speech
Synchronization** to have the text that alexa is currently speaking
light up similar to a Karaoke machine. Bonus points for those of you who
can sing **"I’m On a Boat"**. **Like a boss.**

To do that we will be using two transformers and a command.

### Transformers

  - **ssmlToSpeech** - converts plain text or Speech Synthesis Markup
    Language (SSML) into speech appropriate for binding with the speech
    propery of an APL component.

  - **ssmlToText** - converts SSML to plain text.

### Command

  - **SpeakItem** - reads the contents of a single item on the screen.

The **ssmlToSpeech** and **ssmlToText** transformers will help us
prepare our sauce recipe text to work with with the **SpeakItem**
command.

> **Note**
> 
> In this execersize we will be focusing on the **RecipeIntent** APL
> Document.

![storyboard recipe](/images/storyboard-recipe.png)

**3.6.** Go to the APL Authoring Tool and open your **RecipeIntent** APL
Document and data in the code editor.

Now that we’ve got our APL Document set up in the authoring tool. We’re
going to add the **ssmlToSpeech** and **ssmlToText** transformers to our
template and data object.

**3.7.** Click on ![Data JSON](/images/ui/data-json.png) go to **line 9**
and paste the following **JSON** snippet.

**Speech Synchronization Transformers.**

``` JSON
,
"transformers": [
    {
        "inputPath": "selectedSauceSsml",
        "outputName": "selectedSauceSpeech",
        "transformer": "ssmlToSpeech"
    },
    {
        "inputPath": "selectedSauceSsml",
        "outputName": "selectedSauceText",
        "transformer": "ssmlToText"
    }
]
```

![Adding ssmlToSpeech and ssmlToText
transformers](/images/a3-e03_05_add-smlToSpeech-ssmlToText-transformers.gif)

Now that transformers have been added to the **JSON** data, we now need
to update our APL Document so it uses the transformed version of our
**selectedSauceText**.

**3.8.** In the APL Authoring Tool, click on ![start from
scratch](/images/ui/start-from-scratch.png), go to **line 164** and paste
the following **JSON** snippet on the line below.

**Data-binding.**

``` JSON
"speech": "${payload.sauceBossData.properties.selectedSauceSpeech}",
```

![Adding the data binding for the speech
property](/images/a3-e03_06_add-data-binding-the-speech-property.gif)

Now that we’ve updated or APL Document, You'll need to save it.

**3.9.** Copy your **recipeintent.json** file from the **APL Authoring Tool** and save it in the 
**code editor** in the **Amazon Developer Portal**.

We have one last task to perform in order to get our skill to use Speech Synchronization. In the 
next step, we’ll add the command to our skill code so our skill will speak the transformed 
**selectedSauceText**. We will do this in two steps. First we’ll add a token to our 
**Alexa.Presentation.APL.RenderDocument** directive and we’ll add the 
**Alexa.Presentation.APL.ExecuteCommands** directive to our skill’s response.

**3.10.** Go to your **index.js** skill code file and look for the
comment `// TODO Activity 3.7 - uncomment the token below` and remove
the comment.

After uncommenting the token and removing the `TODO` your code should
look like:

**Code after uncommenting the **token** and removing the **TODO**.**

``` javascript
.addDirective({
    type: 'Alexa.Presentation.APL.RenderDocument',
    token: 'sauceboss',
    document: require('./documents/recipeintent.json'),
    datasources: constructRecipeDataSource(itemName, recipe)
})
```

**3.11.** In your **index.js** file look for the comment `// TODO
Activity 3.8 - uncomment the token below` and uncomment line containing
the token.

Upon removing the content and **TODO** your code should appear as it
does below:

**Alexa.Presentation.APL.ExecuteCommands Directive after uncommenting
the token..**

``` javascript
.addDirective({
    type: 'Alexa.Presentation.APL.ExecuteCommands',
    token: 'sauceboss',
    commands: [{
        type: 'SpeakItem',
        componentId: 'recipeText',
        highlightMode: 'line'
    }]
})
```

At this point your skill is ready to test\! Copy your changes to your
**APL Document** and **data** to the your skill and deploy it to test it
in the simulator.

> **Important**
> 
> Your speech synchronization won’t work in the APL Authoring Tool.
> You’ll need to test either on a device or in the simulator.

> **Tip**
> 
> The token that we added to the
> **Alexa.Presentation.APL.RenderDocument** and
> **Alexa.Presentation.APL.ExecuteCommands** directives must be the
> same.

🏆Congratulations🏆\! At this point you’ve finished activity 3.
