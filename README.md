# SafeRide

SafeRide is a vehicle safety lookup app built with React Native and Expo.
Users drill down from a model year to a specific vehicle and see its NHTSA
crash-test star ratings, a vehicle photo, and any safety recalls on file.

## APIs used

All data comes from NHTSA's free public APIs (no API key required).
Base URL: `https://api.nhtsa.gov`

| Endpoint | Used for |
| --- | --- |
| `GET /SafetyRatings` | List of model years |
| `GET /SafetyRatings/modelyear/{year}` | Makes for a year |
| `GET /SafetyRatings/modelyear/{year}/make/{make}` | Models for a make |
| `GET /SafetyRatings/modelyear/{year}/make/{make}/model/{model}` | Variants (VehicleId + description) |
| `GET /SafetyRatings/VehicleId/{id}` | Star ratings and photo for one vehicle |
| `GET /recalls/recallsByVehicle?make=&model=&modelYear=` | Recalls for a vehicle |

All requests are in `src/api/nhtsa.js`.

## Screen flow

```
Years  →  Makes (with search)  →  Models  →  Variants  →  Vehicle Detail
```

1. **Years**: model years with safety data, newest first.
2. **Makes**: manufacturers for that year, with a search box to filter.
3. **Models**: models the make sold that year.
4. **Variants**: specific versions (body style, drivetrain).
5. **Vehicle Detail**: photo, overall/frontal/side/rollover star ratings, and
   a list of recalls (tap a recall to see the consequence and remedy). The
   ratings and recalls are fetched in parallel with `Promise.all`.

Each header shows where you are (for example, `2022 › HONDA › CIVIC`). Every
screen has a loading spinner, an error message with a Retry button, an empty
state, and pull-to-refresh.

## Project structure

```
App.js                 Navigation setup (React Navigation native stack)
src/api/nhtsa.js       One function per NHTSA endpoint
src/hooks/useApiData.js  Loading / error / refresh state for API calls
src/components/        Reusable UI (ListItem, SearchBar, StarRating, RecallCard, ...)
src/screens/           One file per screen
src/theme.js           Shared colors, spacing, and font sizes
src/utils/format.js    Date formatting and photo selection helpers
```

## How to run

```bash
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone (Camera app on iOS),
or press `a` / `i` to open an Android emulator or iOS simulator.

> **Note:** Test the app on a phone or emulator through Expo Go. Don't rely on
> the web preview alone, because the app targets iOS and Android.

## Known data quirks

- NHTSA does not have a photo for every vehicle. The app falls back to a
  crash-test photo, or a placeholder if there are none.
- Vehicles that weren't tested show a "Not Rated" badge instead of stars.
- Recalls are looked up by model name. A few names in the ratings database
  (such as `DEFENDER 110`) don't match the recalls database exactly, so those
  vehicles may show "No recalls found".
