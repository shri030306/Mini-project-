# Engine 3 — Interface and Access

This folder contains the HTML, CSS, and JavaScript user interface for the Tourist Place Search and Ranking System.

## Current screens

- Public destination search with keyword, city, category, preferred category, maximum entry fee, and minimum-rating controls.
- Ranked destination cards with score and score components in a detail dialog.
- Destination-photo cards and autocomplete suggestions for the full 34-place preview catalogue. Selecting either opens the matching photo with place details.
- Photo source, photographer, and license shown in the detail preview; images are looked up from Wikimedia Commons when the page is online.
- Alternate orders (best match, rating, popularity, fee, and name) for comparing the same search.
- Designed no-results state and filter reset.
- Admin sign-in and place management form. The UI calls the Engine 2 API; the server must verify the admin role for every privileged request.
- Responsive layout and accessible labels, focus styles, status announcements, and reduced-motion support.

## Run a local preview

Open `index.html` in a browser. While the Engine 2 API is unavailable, the page uses the 34-place preview catalogue and shows a preview notice. The place photos need an internet connection. If a matching Commons photo cannot be found or loaded, the card keeps its illustrated fallback. This mode is for presenting the UI only; once the API responds, the UI uses API results instead.

## API handoff to Engine 2

See [`API_CONTRACT.md`](API_CONTRACT.md) for the endpoint and response shapes this UI currently expects. Agree any changes with the backend owner before integrating. Authentication and authorization must be checked server-side; hiding an admin form in the browser does not protect an endpoint.

## Engine ownership

According to the orientation deck, Engine 2 owns the search and ranking logic. Engine 3 owns this browser interface, which sends search requests to Engine 2 and displays its results.
