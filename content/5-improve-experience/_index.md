---
title: Transformers and Hints
weight: 40
pre: "<b>Activity III. </b>"
chapter: true
---

# Time to think about the experience!

Let’s make our experience better for customers. We’ll start by adding
hints. Hints are a great way to clue your customers in on how to
interact with your skill. Hints must include the entire spoken phrase
with the wake word, the invocation name and the utterance. With APL you
could manually add a hint string to your APL Document, however, the
customer has the ability to set the wake word to either **Alexa**,
**Amazon**, **Echo**, or **Computer**, so if you were to hardcode it to
**Alexa**, and the customer had set their wake word to **Amazon** then
your hint string will appear incorrectly.

To ensure that our hint includes the right wake word we will use the
**textToHint transformer**.

![Sauce Boss Hint String](/images/sauce-boss-hint-string.png)
