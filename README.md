# Traffic Splitter

### PROJECT RUN
> npm
```shell
$ npm install # install dependencies

$ npm start # run the application
```
> Access the page
```
http://localhost:3000
```

### HOW IT WORKS
> Traffic allocation function is implemented on the server side. The operating flow is described in order as follows.
1. When a user visits the main page, a UUID is created and stored in a cookie. The UUID is a non-identifying ID to identify users by browser (or device) unit.

2. Reads UUID from the cookie and sends it to the server along with Variation (an empty string value at the first visit).

3. After reading the received body data (UUID, Variation), the server checks whether the corresponding UUID has a previous visit history. If it is searched in'visitData' (object variable) acting as a database and there is no visit history, the Variation value is assigned to the corresponding UUID as'A' or'B'.

4. To ensure that traffic is assigned as 50:50, we used a flag variable called prev. The prev variable is like a kind of On/Off switch, so it is only changed for new visitors. For example, A when user a visits, B when user b visits, A when user c visits, and B when user d visits.

5. When Variation is set, the cumulative number of visits of the corresponding UUID is increased by 1, and UUID and Variation information are converted into JSON format and returned to the browser.

6. The currently implemented mechanism is a method that allocates 50:50 when a request comes in from multiple browsers to one application server, and it is not a mechanism that considers the method of allocating variations by receiving traffic from multiple servers.

7. Depending on the Variation response returned, the browser renders a red(variation A) or blue (variation B) ball.