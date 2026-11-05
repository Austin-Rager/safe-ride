// All calls to NHTSA's free public APIs live here (no API key needed).
// Docs: https://www.nhtsa.gov/nhtsa-datasets-and-apis

const BASE_URL = 'https://api.nhtsa.gov';

// Fetches a URL and returns the "Results" array from the JSON response.
// Note: the recalls endpoint spells it lowercase ("results"), so we accept both.
function getJson(path) {
  return fetch(BASE_URL + path)
    .then((res) => {
      if (!res.ok) {
        const error = new Error(`Request failed (${res.status})`);
        error.status = res.status;
        throw error;
      }
      return res.json();
    })
    .then((data) => data.Results || data.results || []);
}

// Returns model years as numbers, newest first.
export function getModelYears() {
  return getJson('/SafetyRatings').then((results) =>
    results.map((item) => item.ModelYear).sort((a, b) => b - a)
  );
}

// Returns make names (e.g. "HONDA") for a model year.
export function getMakes(year) {
  return getJson(`/SafetyRatings/modelyear/${year}`).then((results) =>
    results.map((item) => item.Make)
  );
}

// Returns model names (e.g. "CIVIC") for a year and make.
export function getModels(year, make) {
  return getJson(
    `/SafetyRatings/modelyear/${year}/make/${encodeURIComponent(make)}`
  ).then((results) => results.map((item) => item.Model));
}

// Returns variants: [{ VehicleId, VehicleDescription }]
export function getVariants(year, make, model) {
  return getJson(
    `/SafetyRatings/modelyear/${year}/make/${encodeURIComponent(make)}` +
      `/model/${encodeURIComponent(model)}`
  );
}

// Returns the crash-test ratings object for a single vehicle.
export function getVehicleRatings(vehicleId) {
  return getJson(`/SafetyRatings/VehicleId/${vehicleId}`).then((results) => {
    if (results.length === 0) {
      throw new Error('No safety data found for this vehicle.');
    }
    return results[0];
  });
}

// Returns the list of recalls for a year/make/model.
// The recalls API answers 400 (with an empty list) when it doesn't know the
// model name, so we treat that as "no recalls" instead of an error.
export function getRecalls(year, make, model) {
  return getJson(
    `/recalls/recallsByVehicle?make=${encodeURIComponent(make)}` +
      `&model=${encodeURIComponent(model)}&modelYear=${year}`
  ).catch((error) => {
    if (error.status === 400) return [];
    throw error;
  });
}
