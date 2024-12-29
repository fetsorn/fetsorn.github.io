# Design

client for visual recognition of medical reports using artifical intelligence

competes: haut.ai

interacts: with users, AI API

constitutes: a web application and a mobile application for ios

includes: database for pictures and reports, UI, UI database

target audience: patients, members of hospitals, students

mission: make expertise accessible and affordable

competitive analysis
existing products: 
- https://www.eyenuk.com/en/products/eyeart/
- https://www.digitaldiagnostics.com/products/eye-disease/idx-dr-eu/
- https://ocuscreen.ru

stakeholder: Digital Vision Solutions LLC, Norcivilan Labs

patterns: MVC

 - main screen 
   - gallery of images
   - login button if logged out
   - signup button if logged out
   - profile button if logged in
 - login screen
   - logo
   - email input
   - password input
   - forgotten password link
   - submit button
   - signup button
   - back button to main screen
 - signup screen
   - email input
   - password input
   - city input
   - country dropdown
   - name input
   - surname input
   - patronim input
   - occupation dropdown
   - promocode input
   - submit button
   - back button to main screen
 - profile screen
   - name
   - about me
     - country
     - city
     - email
   - occupation
     - position
     - organization
   - back button to main screen
 - report screen 
   - photo
   - countours over photo
   - crosshairs over photo
   - contour bookmarks
   - legend card
     - label for each contour colour
   - back button to main screen
   - conclusion card
     - label
     - status found/notfound
   - circle cross chart
     - label
     - circle cross
     - numbers
   - download pdf report button

