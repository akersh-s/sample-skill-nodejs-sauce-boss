---
title: Databinding
weight: 30
pre: "<b>Activity II. </b>"
chapter: true
---

# Make the visuals dynamic with databinding

If a customer asks for a particular recipe from sauce boss, we need to
be able to find that recipe and recite it back to the customer. We
should also be able to display the recipe with a visual cue on the
screen. We can take a look at our storyboard for an idea of what the APL
Document needs to look like on both the small round hub viewport as well
as the large hub viewport.

![Recipe Screen](/images/recipe-screen.png)

Until this point, you've been working with the **documents/launchrequest.json** file. 
In this activity, you be creating a new APL Document. Make sure that you copy any changes you made 
to the **documents/launchrequest.json** in the [APL authoring
tool](https://developer.amazon.com/alexa/console/ask/displays/) and paste them into your 
**launchrequest.json** file, save and deploy. After completing this activity, the skill will have a 
screen that showsrecipes dynamically and works with many viewports. To do that you will create a new 
**document** called **recipeintent.json**.