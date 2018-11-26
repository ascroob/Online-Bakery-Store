// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//firebase resource for authentication: 
    //https://alligator.io/angular/firebase-authentication-angularfire2?fbclid=IwAR1nYQxRysHTYVOfY8OsQx0q0WbeaOTZD8qHwd9qnY0T22tOsJ3hJENb-gE


export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBBH2J-42vlZbZjWVhjK3mdAt_4HFA1dwg",
    authDomain: "lab5-27a4a.firebaseapp.com",
    databaseURL: "https://lab5-27a4a.firebaseio.com",
    projectId: "lab5-27a4a",
    storageBucket: "",
    messagingSenderId: "853295123687"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
