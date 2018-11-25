---
pre: "c. "
title: Back end
weight: 3
---

Now that we’ve built our Voice User Interaction model, which provides
the training data to the Alexa Service so it knows how to interpret what
the customer has said, we are now going to create our back-end service
so we can return a response.

**12.** On the top navigation, select the **Code** hyperlink. Alexa
hosted skills allows us to edit, configure, and change the back-end of
our code without leaving the developer portal.

**13.** Select **index.js** on the left-hand navigation. Copy
[the code from this link](https://raw.githubusercontent.com/akersh-s/sample-skill-nodejs-sauce-boss/master/workshop/index.js) and Paste it into the **index.js** file in the Developer
Portal window.

![Updating the **index.js** file](/images/a0-e11_12_create-index.js.gif)

**14.** Click on the **package.json** file. Copy the following JSON, paste it into **package.json** replacing the existing contents and click Save.

**package.json.**

``` JSON
{
  "name": "sauce-boss",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ask-sdk-core": "^2.0.0",
    "ask-sdk-model": "^1.0.0",
    "i18next": "^10.5.0",
    "i18next-sprintf-postprocessor": "^0.2.2"
  }
}

```

![Updating **package.json**](/images/a0-e13_package.json.gif)

**15.** Click the **Deploy** button.

Doing so will deploy your skill’s backend. Once it’s finished deploying,
you’ll be able to test your skill.