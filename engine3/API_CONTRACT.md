# Engine 3 / Engine 2 API Handoff

The Engine 3 front end currently expects these JSON endpoints on `http://localhost:3000/api`. The Engine 2 owner should confirm the contract before implementation or adjust `engine3/app.js` to match the agreed server routes.

## Filter options

`GET /api/places/options`

Return active city and category options for the filter controls:

```json
{"cities":["Dandeli","Hampi"],"categories":["Historical","Nature","Temple"]}
```

## Public search

`GET /api/places/search?q=&city=&category=&preferredCategory=&maxBudget=&minRating=&sort=`

The API applies server-side input validation and filters, retrieves active places from Engine 1, calls the C++ ranking module, and returns results in the requested order. `maxBudget=0` is a valid free-entry filter.

```json
{
  "count": 1,
  "weights": {"rating": 0.5, "popularity": 0.3, "preference": 0.2},
  "results": [
    {
      "place_id": 12,
      "place_name": "Example Falls",
      "city": "Yellapur",
      "state": "Karnataka",
      "categories": ["Nature", "Waterfall"],
      "description": "A forest waterfall.",
      "rating": 4.5,
      "popularity": 81,
      "entry_fee": 30,
      "score": 0.89,
      "match_quality": 0.82,
      "score_components": {
        "rating": 0.9,
        "popularity": 0.81,
        "preference_match": 1
      }
    }
  ]
}
```

The UI sort values are `score`, `rating`, `popularity`, `fee`, and `name`. `score` must preserve Engine 2 / C++ ordering. Alternate modes should be applied by the backend so the UI does not become the source of ranking logic.

## Admin access and catalogue management

- `POST /api/auth/login` with `{"password":"..."}` returns `{"token":"...","role":"admin"}` only after server-side authentication.
- `GET /api/auth/session` accepts `Authorization: Bearer <token>` and returns `{"role":"admin"}` for a valid admin session.
- `POST /api/auth/logout` invalidates the session/token.
- `GET /api/admin/places` accepts the same admin bearer token and returns `{"places":[...]}` for the admin catalogue.
- `POST /api/admin/places` accepts a place record and requires a valid admin bearer token. Validate all fields on the server and in Engine 1 constraints.
- `PATCH /api/admin/places/:id` accepts validated field updates. Sending `{"status":"INACTIVE"}` deactivates the place instead of deleting history.

Return errors as JSON, for example `{"message":"entry_fee must be zero or greater"}`, with suitable HTTP status codes. Do not rely on front-end validation for data integrity or access control.
