/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

// List of the supported recipes in the skill
const recipes = {
  'RECIPE_EN_US': {
    'barbecue': 'To make BBQ sauce, combine brown sugar, ketchup, vinegar, and Worcestershiresauce in a blender. Season with salt, pepper, and cayenne pepper. Blend until smooth.',
    'honey mustard': 'To make honey mustard, mix mayonnaise, yellow mustard, Dijon mustard, honey, and lemon juice together in a bowl. Cover and chill in the refrigerator overnight.',
    'ranch': 'For ranch dressing, whisk together mayonnaise, sour cream, chives, parsley, dill, garlic powder, onion powder, salt and pepper in a large bowl. Cover and refrigerate for 30 minutes before serving.',
    'caesar': 'For Caesar dressing, combine lemon juice, vinegar, water, shredded parmesan cheese, Dijon mustard, garlic powder and pepper in a jar. Cover with a lid and shake well. Refrigerate until ready to use.',
    'worcestershire': 'To make Worcestershire*, *combine apple cider vinegar, water, soy sauce, brown sugar, mustard powder, onion powder, garlic powder, ground cinnamon, and a pinch of black pepper together in a saucepan; bring to a boil and cook until fragrant, about 45 seconds, then cool to room temperature.',
    'thousand island': 'For Thousand Island dressing, mix together mayonnaise, ketchup, sweet pickle relish, salt and pepper in a small bowl until thoroughly combined. Chill and serve.',
    'pesto': 'To make pesto, combine basil, garlic, Parmesan cheese, olive oil, and pine nuts in a food processor or blender. Blend to a smooth paste. Add parsley if desired.',
    'tartar': 'For tartar sauce, combine mayonnaise, chopped onion, sweet pickle relish, salt and pepper in a medium bowl. Mix well and let stand for at least 10 minutes before serving.',
    'pizza': 'To make pizza sauce, mix together tomato sauce and tomato paste in a medium bowl until smooth. Stir in oregano, dried minced garlic and paprika.',
    'cranberry': 'For cranberry sauce, dissolve sugar in orange juice in a saucepan over medium heat. Stir in cranberries and cook until they start to pop. Remove from heat and transfer the sauce to a bowl before serving.',
    'secret': 'No need to butter me up, I can tell you\'re in a jam, but the secret sauce is safe with me.'
  }
};

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const languageStrings = {
  en: {
    translation: {
      RECIPES: recipes.RECIPE_EN_US,
      SKILL_NAME: 'Sauce Boss',
      WELCOME_MESSAGE: 'Welcome to %s. You can ask a question like, what\'s the recipe for a %s? ... Now, what can I help you with?',
      WELCOME_REPROMPT: 'For instructions on what you can say, please say help me.',
      DISPLAY_CARD_TITLE: '%s  - Recipe for %s.',
      HELP_MESSAGE: 'You can ask questions such as, what\'s the recipe for a %s, or, you can say exit...Now, what can I help you with?',
      HELP_REPROMPT: 'You can say things like, what\'s the recipe for a %s, or you can say exit...Now, what can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
      RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
      RECIPE_NOT_FOUND_MESSAGE: 'I\'m sorry, I currently do not know ',
      RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'the recipe for %s. ',
      RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'that recipe. ',
      RECIPE_NOT_FOUND_REPROMPT: 'What else can I help with?'
    },
  },
  'en-US': {
    translation: {
      RECIPES: recipes.RECIPE_EN_US,
      SKILL_NAME: 'Sauce Boss'
    },
  }
};


/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t(getRandomItem(Object.keys(recipes.RECIPE_EN_US)));

    const speakOutput = requestAttributes.t('WELCOME_MESSAGE', requestAttributes.t('SKILL_NAME'), item);
    const repromptOutput = requestAttributes.t('WELCOME_REPROMPT');

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    let response = handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require('./documents/launchrequest.json'),
        datasources: {
          "sauceBossData": {
            "type": "object",
            "properties": {
              "hintString": "How do I make barbecuesauce?"
            },
            "transformers": [{
              "inputPath": "hintString",
              "transformer": "textToHint"
            }]
          }
        }

      })
      .getResponse();

    return response;
  },
};

const RecipeHandler = {
  canHandle(handlerInput) {
    return ((handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        handlerInput.requestEnvelope.request.intent.name === 'RecipeIntent') 
        ||
      (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'));
    // && handlerInput.requestEnvelope.request.source.handler === 'Press'));
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let itemName;

    //Touch Event Request
    if (handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent') {
      itemName = (handlerInput.requestEnvelope.request.arguments[0]).toLowerCase();
    } else {
      //Voice Intent Request
      const itemSlot = handlerInput.requestEnvelope.request.intent.slots.Item;
      if (itemSlot && itemSlot.value) {
        itemName = itemSlot.value.toLowerCase();
      }
    }
    //special cleanup for bbq sauce 
    itemName = itemName.replace("bbq", "barbecue").replace(" sauce", "");

    const cardTitle = requestAttributes.t('DISPLAY_CARD_TITLE', requestAttributes.t('SKILL_NAME'), itemName);
    const myRecipes = requestAttributes.t('RECIPES');

    //Convert the slot value into one of our recipes
    const recipe = myRecipes[itemName];
    let speakOutput = "";

    if (recipe) {
      sessionAttributes.speakOutput = recipe;
      //sessionAttributes.repromptSpeech = requestAttributes.t('RECIPE_REPEAT_MESSAGE');
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      let response = handlerInput.responseBuilder
        .speak("")
        .withSimpleCard(cardTitle, recipe)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          token: 'sauceboss',
          version: '1.0',
          document: require('./documents/recipeintent.json'),
          datasources: constructRecipeDataSource(itemName, recipe)
        })
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'sauceboss',
          commands: [{
            type: 'SpeakItem',
            componentId: 'recipeText',
            highlightMode: 'line'
          }]
        })
        .getResponse();

      return response;
    } else {
      speakOutput = requestAttributes.t('RECIPE_NOT_FOUND_MESSAGE');
      const repromptSpeech = requestAttributes.t('RECIPE_NOT_FOUND_REPROMPT');
      if (itemName) {
        speakOutput += requestAttributes.t('RECIPE_NOT_FOUND_WITH_ITEM_NAME', itemName);
      } else {
        speakOutput += requestAttributes.t('RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME');
      }
      speakOutput += repromptSpeech;

      sessionAttributes.speakOutput = speakOutput; //saving speakOutput to attributes, so we can use it to repeat
      sessionAttributes.repromptSpeech = repromptSpeech;

      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      return handlerInput.responseBuilder
        .speak(sessionAttributes.speakOutput)
        .reprompt(sessionAttributes.repromptSpeech)
        .getResponse();
    }
  }
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t(getRandomItem(Object.keys(recipes.RECIPE_EN_US)));

    sessionAttributes.speakOutput = requestAttributes.t('HELP_MESSAGE', item);
    sessionAttributes.repromptSpeech = requestAttributes.t('HELP_REPROMPT', item);

    let response = handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        datasources: recipes,
        document: require('./documents/helpintent.json')
      })
      .getResponse();

    return response;
  },
};

const TouchEventHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent' &&
      handlerInput.requestEnvelope.request.source.handler === 'Press';
  },
  handle(handlerInput) {
    let sauce = handlerInput.requestEnvelope.request.arguments[0];


    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('STOP_MESSAGE', requestAttributes.t('SKILL_NAME'));

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};


const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};


// Finding the locale of the user
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  },
};

/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    RecipeHandler,
    HelpHandler,
    RepeatHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addRequestInterceptors(function (handlerInput) {
    console.log("\n" + "*** REQUEST ***");
    console.log("\n" + JSON.stringify(handlerInput, null, 4));
  })
  .addResponseInterceptors(function (requestEnvelope, response) {
    console.log("\n" + "*** RESPONSE ***");
    console.log("\n" + JSON.stringify(response, null, 4));
  })
  .addErrorHandlers(ErrorHandler)
  .lambda();


function getRandomItem(arrayOfItems) {
  // the argument is an array [] of words or phrases
  let i = 0;
  i = Math.floor(Math.random() * arrayOfItems.length);
  return (arrayOfItems[i]);
}

//this function will get the Recipe Image to display on screen
function getRecipeImage(selectedSauce) {  
  return "https://s3.amazonaws.com/sauceboss/" + selectedSauce + "-sauce-500x500.png";
}

// Constructs the datasource object for the given sauce and recipe
function constructRecipeDataSource(selectedSauce, recipe) {
  return {
    "sauceBossData": {
      "type": "object",
      "properties": {
        "selectedSauceSsml": "<speak>" + recipe + "</speak>",
        "selectedSauce": selectedSauce,
        "selectSauceCaps": selectedSauce.toUpperCase(),
        "selectedSauceImg": getRecipeImage(selectedSauce),
        "hintString": "How do I make " + selectedSauce + " sauce?"
      },
      "transformers": [{
          "inputPath": "selectedSauceSsml",
          "outputName": "selectedSauceSpeech",
          "transformer": "ssmlToSpeech"
        },
        {
          "inputPath": "selectedSauceSsml",
          "outputName": "selectedSauceText",
          "transformer": "ssmlToText"
        },
        {
          "inputPath": "hintString",
          "transformer": "textToHint"
        }
      ]
    }
  }
}