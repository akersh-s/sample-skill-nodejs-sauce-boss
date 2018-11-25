---
title: Alexa Skills Architecture
weight: 10
---

<div style="width:80%; margin-left:10%;">
<div class="embed-responsive embed-responsive-16by9" style="margin-top:2rem;"><iframe class="embed-responsive-item" style="border:0;" src="https://www.youtube.com/embed/hbH6gZoKcbM"></iframe>
</div>
</div>

When a customer says the **wake word** the Alexa Service analyzes what
the customer said using Speech Recognition, Machine Learning and Natural
Language Understanding. 

Don’t be intimidated by these complicated sounding words, you don’t need a deep understanding of how they work in
order to build an Alexa skill. You should focus on how people will
converse with your skill and design a **voice user interaction model**,
which dictates how the Alexa Services’s speech science engines will
interpret what the user says. This information is mapped to an
**Intent** that’s defined in your model and is sent as a JSON Request to
your skill’s back-end service.

When your service receives the request, your skill will unpack it,
determine what to do with it an return a JSON response back to the Alexa
Service. The service will then unpack the response and determine what to
do with it. If you return a **Speechlet** the Alexa Service will use
Text to Speech to convert the provided text to audio. If you return an
APL Directive and the device has a screen the APL document will be
rendered and displayed on the screen.