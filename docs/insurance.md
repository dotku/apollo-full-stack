# Insurrance Application

## Goal

Create a web API that exposes four endpoints:  

1. POST route that starts a new insurance application and initializes it with the
provided data  
    * This route should return a “resume” route that points to the frontend URL to load the created application
2. GET route that can retrieve the current insurance application  
3. PUT route that will update the insurance application with provided data  
4. POST route that validates the application and returns a price  
    * You do not actually need to do any calculation here, returning a random
      number value would be sufficient

## Design

[x] Use codepen to simulate the 3rd party quest:
   <https://codepen.io/dotku/pen/vYaePKW?editors=1011>  
[ ] Use react-routefrontend to continue fillout the form, and send the put request to
   successfuly patch/submit new application.
[ ] Frontend validation (basic)
[ ] Allow additional applicant
[-] TypeScript, partially finised
[-] Use `joins` to hold additional applicants
