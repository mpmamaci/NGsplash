# NgSplash

Emmeded the Unsplash API inside an Angular Application, generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Gettings Started

### Development

1. `npm install`
2. Enter your unsplash `accessKey` inside the `environment.ts`
   - Leave `accessKey` equals `""` to enter Demo Mode 
3. `npm start`

### Release

1. Get a Release Version "link"
2. Start a http server
   - https://gist.github.com/willurd/5720255
   - Caution: Wrong Settings leads to non working angular router

### Demo Mode

If you have no `accessKey` you can use this Application in `Demo Mode`.

In `Demo Mode` this Application has not connection to the unsplash Server and returns the static values inside the `assets/demo-image-response.json` file.
