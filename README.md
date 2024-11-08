# skip-rosetta-stone-foundations-
skip all units in rosetta stone foundations unversity tests and hours

how it works?

1- edit constants.json:
 by listening to network in inspect mode when taking test in any unit
 search graph then look for authorization session token in bottom, 
 serach tracking you will find a file its name has score , it contsaints a url has ee/cc/schoolName/id/userId.
 langaugeCode: ARA for Arabic,  FRA for french, ....
{
  "person": "Your name",
  "authorization": "",
  "sessionToken": "",
  "schoolName": "xxxxxxxx-yyyy-zzzz-wwww-ssssssssssss",
  "unitsToComplete": [1, 2, 3],
  "userId": "7 digits or more find them in tracking in network inspect",
  "languageCode": "FRA"
}

then save it 
and run in terminal: 
node index.js

bye! :)
