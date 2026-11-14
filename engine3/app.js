const API_BASE = "http://localhost:3000/api";

// Temporary presentation data. Engine 2's API becomes the source of results when available.
const demoPlaces = [
  { place_id: "p01", place_name: "Virupaksha Temple & Hampi Ruins", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "Walk through an extraordinary landscape of temples, stone streets and Vijayanagara-era ruins.", rating: 4.9, popularity: 98, entry_fee: 50, score: 0.984, kind: "heritage" },
  { place_id: "p02", place_name: "Vijaya Vittala Temple & Stone Chariot", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "See the carved stone chariot and musical pillars at one of Hampi’s best-known monuments.", rating: 4.9, popularity: 99, entry_fee: 50, score: 0.987, kind: "heritage" },
  { place_id: "p03", place_name: "Jog Falls Viewpoint", city: "Shivamogga", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "Take in a dramatic waterfall framed by the forested Western Ghats.", rating: 4.7, popularity: 93, entry_fee: 50, score: 0.949, score_components: { rating: 0.94, popularity: 0.93, preference_match: 1 }, kind: "water" },
  { place_id: "p04", place_name: "Unkal Lake & Park", city: "Hubballi", state: "Karnataka", categories: ["Nature", "Lake"], description: "A calm lakeside escape for an evening walk, a quiet pause or a family outing.", rating: 4.3, popularity: 82, entry_fee: 10, score: 0.876, kind: "nature" },
  { place_id: "p05", place_name: "Chandramouleshwara Temple", city: "Hubballi", state: "Karnataka", categories: ["Temple", "Historical"], description: "Discover the stone carvings and Chalukyan architecture of this historic temple.", rating: 4.5, popularity: 78, entry_fee: 0, score: 0.884, kind: "heritage" },
  { place_id: "p06", place_name: "Gokarna Om Beach", city: "Gokarna", state: "Karnataka", categories: ["Beach", "Nature"], description: "A sweeping coastline, rocky coves and a laid-back beach town atmosphere.", rating: 4.6, popularity: 92, entry_fee: 0, score: 0.936, kind: "coast" },
  { place_id: "p07", place_name: "Badami Cave Temples", city: "Badami", state: "Karnataka", categories: ["Historical", "Temple"], description: "Explore rock-cut cave shrines overlooking the red sandstone cliffs and Agastya Lake.", rating: 4.7, popularity: 91, entry_fee: 30, score: 0.943, kind: "heritage" },
  { place_id: "p08", place_name: "Dandeli River Rafting & Wildlife", city: "Dandeli", state: "Karnataka", categories: ["Wildlife", "Adventure", "Nature"], description: "River scenery, forest trails and outdoor adventures along the Kali River.", rating: 4.6, popularity: 94, entry_fee: 250, score: 0.942, kind: "water" },
  { place_id: "p09", place_name: "Mullayanagiri Peak", city: "Chikkamagaluru", state: "Karnataka", categories: ["Hill Station", "Nature"], description: "A high mountain viewpoint with winding roads, cool air and wide hill-country views.", rating: 4.8, popularity: 96, entry_fee: 0, score: 0.968, score_components: { rating: 0.96, popularity: 0.96, preference_match: 1 }, kind: "nature" },
  { place_id: "p10", place_name: "Mysore Palace", city: "Mysuru", state: "Karnataka", categories: ["Historical", "Architecture"], description: "Visit an ornate royal residence known for its grand halls and illuminated façade.", rating: 4.9, popularity: 98, entry_fee: 100, score: 0.98, score_components: { rating: 0.98, popularity: 0.98, preference_match: 1 }, kind: "city" },
  { place_id: "p11", place_name: "Sathodi Falls", city: "Yellapur", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "A forest waterfall reached by a scenic drive through Uttara Kannada.", rating: 4.5, popularity: 81, entry_fee: 30, score: 0.893, kind: "water" },
  { place_id: "p12", place_name: "Murudeshwar Temple & Beach", city: "Murudeshwar", state: "Karnataka", categories: ["Temple", "Beach"], description: "A dramatic coastal landmark combining temple architecture with Arabian Sea views.", rating: 4.7, popularity: 95, entry_fee: 0, score: 0.955, kind: "coast" }
];

// Keep the offline preview catalogue aligned with the 34 records in database_queries.sql.
const extraPlaces = [
  ["Nrupatunga Betta Viewpoint", "Hubballi", 3, 20, 4.4, 80], ["Sadhankeri Park & Lake", "Dharwad", 3, 10, 4.2, 72],
  ["Kudle Beach", "Gokarna", 1, 0, 4.5, 88], ["Yana Rocks & Caves", "Kumta", 3, 20, 4.6, 85], ["Magod Falls", "Yellapur", 3, 20, 4.3, 76],
  ["Sirsi Marikamba Temple", "Sirsi", 4, 0, 4.8, 89], ["Ulavi Channabasaveshwara Temple", "Ulavi", 4, 0, 4.4, 79], ["Banavasi Madhukeshwara Temple", "Banavasi", 2, 0, 4.6, 83],
  ["Pattadakal UNESCO Monuments", "Pattadakal", 2, 40, 4.8, 90], ["Aihole Historical Complex", "Aihole", 2, 30, 4.5, 84], ["Gol Gumbaz", "Vijayapura", 2, 25, 4.6, 87], ["Chitradurga Fort", "Chitradurga", 2, 25, 4.7, 89],
  ["Agumbe Sunset Point", "Shivamogga", 6, 0, 4.5, 85], ["Baba Budangiri Shrine & Hills", "Chikkamagaluru", 6, 0, 4.4, 86], ["Kudremukh National Park", "Chikkamagaluru", 5, 200, 4.7, 88],
  ["Belur Chennakeshava Temple", "Belur", 2, 0, 4.8, 92], ["Halebidu Hoysaleshwara Temple", "Halebidu", 2, 0, 4.8, 91], ["Chamundi Hill & Temple", "Mysuru", 4, 0, 4.7, 90], ["Abbey Falls", "Madikeri", 3, 50, 4.5, 87],
  ["Raja Seat Viewpoint", "Madikeri", 6, 25, 4.4, 84], ["Malpe Beach & St Mary Island", "Udupi", 1, 300, 4.6, 91], ["Bandipur National Park Safari", "Bandipur", 5, 350, 4.7, 94]
].map(([place_name, city, categoryId, entry_fee, rating, popularity], index) => {
  const categories = { 1: ["Beach", "Nature"], 2: ["Historical", "Architecture"], 3: ["Nature"], 4: ["Temple", "Historical"], 5: ["Wildlife", "Nature"], 6: ["Hill Station", "Nature"] }[categoryId];
  const description = `${place_name} in ${city}, Karnataka. Explore this ${categories[0].toLowerCase()} destination and see its visitor rating, entry fee and ranking details.`;
  return { place_id: `p${String(index + 13).padStart(2, "0")}`, place_name, city, state: "Karnataka", categories, description, rating, popularity, entry_fee, distance_km: 100, score: 0.8, kind: "nature" };
});
demoPlaces.push(...extraPlaces);

const photoCache = new Map();
const photoFallback = "https://commons.wikimedia.org/w/api.php";

const elements = {
  form: document.querySelector("#searchForm"),
  query: document.querySelector("#query"),
  suggestions: document.querySelector("#placeSuggestions"),
  city: document.querySelector("#cityFilter"),
  category: document.querySelector("#categoryFilter"),
  preference: document.querySelector("#preferenceFilter"),
  budget: document.querySelector("#budgetFilter"),
  rating: document.querySelector("#ratingFilter"),
  sort: document.querySelector("#sortSelect"),
  grid: document.querySelector("#resultsGrid"),
  count: document.querySelector("#resultsCount"),
  empty: document.querySelector("#emptyState"),
  demoNotice: document.querySelector("#demoNotice"),
  placeDialog: document.querySelector("#placeDialog"),
  placeDialogContent: document.querySelector("#placeDialogContent"),
  adminDialog: document.querySelector("#adminDialog"),
  adminMessage: document.querySelector("#adminMessage"),
  adminTools: document.querySelector("#adminTools"),
  placeMessage: document.querySelector("#placeMessage"),
  toast: document.querySelector("#toast")
};

let toastTimer;
let currentPlaces = [];
let currentWeights = { rating: 0.5, popularity: 0.3, preference: 0.2 };
let adminToken = sessionStorage.getItem("yatraAdminToken") || "";
let adminPlaces = [];

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function categoriesOf(place) {
  if (Array.isArray(place.categories)) return place.categories;
  return String(place.categories ?? "").split(/[|,]/).map(value => value.trim()).filter(Boolean);
}

function fillSelect(select, values, firstLabel) {
  const current = select.value;
  select.replaceChildren(new Option(firstLabel, ""));
  [...new Set(values)].sort((a, b) => a.localeCompare(b)).forEach(value => select.add(new Option(value, value)));
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function populateFilters(places) {
  fillSelect(elements.city, places.map(place => place.city), "Anywhere in Karnataka");
  const categories = places.flatMap(categoriesOf);
  fillSelect(elements.category, categories, "All places");
  fillSelect(elements.preference, categories, "No preference");
}

async function loadFilterOptions() {
  try {
    const response = await fetch(`${API_BASE}/places/options`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Filter options are not available");
    const options = await response.json();
    fillSelect(elements.city, options.cities || [], "Anywhere in Karnataka");
    fillSelect(elements.category, options.categories || [], "All places");
    fillSelect(elements.preference, options.categories || [], "No preference");
  } catch {
    populateFilters(demoPlaces);
  }
}

function readFilters() {
  return {
    query: elements.query.value.trim(),
    city: elements.city.value,
    category: elements.category.value,
    preferredCategory: elements.preference.value,
    maxBudget: elements.budget.value,
    minRating: elements.rating.value,
    sort: elements.sort.value
  };
}

function matchesDemo(place, filters) {
  const queryWords = normalize(filters.query).split(/\s+/).filter(Boolean);
  const searchable = normalize([place.place_name, place.city, place.state, ...categoriesOf(place), place.description].join(" "));
  const hasTextMatch = !queryWords.length || queryWords.some(word => searchable.includes(word));
  const cityMatch = !filters.city || normalize(place.city) === normalize(filters.city);
  const categoryMatch = !filters.category || categoriesOf(place).some(category => normalize(category) === normalize(filters.category));
  const budgetMatch = filters.maxBudget === "" || Number(place.entry_fee) <= Number(filters.maxBudget);
  const ratingMatch = filters.minRating === "" || Number(place.rating) >= Number(filters.minRating);
  return hasTextMatch && cityMatch && categoryMatch && budgetMatch && ratingMatch;
}

function sortDemo(places, mode) {
  const values = [...places];
  const byName = (a, b) => a.place_name.localeCompare(b.place_name);
  if (mode === "rating") return values.sort((a, b) => Number(b.rating) - Number(a.rating) || byName(a, b));
  if (mode === "popularity") return values.sort((a, b) => Number(b.popularity) - Number(a.popularity) || byName(a, b));
  if (mode === "fee") return values.sort((a, b) => Number(a.entry_fee) - Number(b.entry_fee) || byName(a, b));
  if (mode === "name") return values.sort(byName);
  return values.sort((a, b) => Number(b.score) - Number(a.score) || byName(a, b));
}

function paramsFromFilters(filters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.city) params.set("city", filters.city);
  if (filters.category) params.set("category", filters.category);
  if (filters.preferredCategory) params.set("preferredCategory", filters.preferredCategory);
  if (filters.maxBudget !== "") params.set("maxBudget", filters.maxBudget);
  if (filters.minRating !== "") params.set("minRating", filters.minRating);
  params.set("sort", filters.sort);
  return params;
}

async function searchPlaces(filters) {
  const response = await fetch(`${API_BASE}/places/search?${paramsFromFilters(filters)}`, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Search request failed (${response.status})`);
  const payload = await response.json();
  return Array.isArray(payload) ? { results: payload, weights: null } : { results: payload.results || [], weights: payload.weights || null };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function kindFor(place) {
  const cats = normalize(categoriesOf(place).join(" "));
  if (cats.includes("beach") || cats.includes("coast")) return "coast";
  if (cats.includes("historical") || cats.includes("temple") || cats.includes("architecture")) return "heritage";
  if (cats.includes("waterfall") || normalize(place.place_name).includes("falls")) return "water";
  if (cats.includes("nature") || cats.includes("hill")) return "nature";
  return "city";
}

function feeLabel(place) {
  const fee = Number(place.entry_fee);
  return Number.isFinite(fee) ? (fee === 0 ? "Free entry" : `₹${fee.toLocaleString("en-IN")}`) : "Fee not listed";
}

async function placePhoto(place, image, credit) {
  const id = String(place.place_id);
  if (!photoCache.has(id)) {
    const cached = sessionStorage.getItem(`yatraPhoto:v2:${id}`);
    if (cached) {
      try { photoCache.set(id, JSON.parse(cached)); } catch { /* Ignore stale cached image data. */ }
    }
  }
  if (!photoCache.has(id)) {
    const request = (async () => {
      // Search the landmark name first; requiring its city and state in the same
      // Commons search was too restrictive for many regional destinations.
      const queries = [place.place_name, `${place.place_name} ${place.city}`];
      for (const query of queries) {
        const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "8", prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1400", format: "json", origin: "*" });
        const response = await fetch(`${photoFallback}?${params}`, { headers: { Accept: "application/json" } });
        if (!response.ok) continue;
        const payload = await response.json();
        const pages = Object.values(payload.query?.pages || {});
        const match = pages.find(page => page.imageinfo?.[0]?.thumburl) || pages.find(page => page.imageinfo?.[0]?.url);
        if (!match?.imageinfo?.[0]) continue;
        const info = match.imageinfo[0];
        const metadata = info.extmetadata || {};
        const photo = { url: info.thumburl || info.url, title: match.title.replace(/^File:/, ""), artist: (metadata.Artist?.value || "Wikimedia Commons contributor").replace(/<[^>]*>/g, ""), license: metadata.LicenseShortName?.value || "See source page", page: info.descriptionurl };
        sessionStorage.setItem(`yatraPhoto:v2:${id}`, JSON.stringify(photo));
        return photo;
      }
      return null;
    })().catch(() => null);
    photoCache.set(id, request);
  }
  let photo = await photoCache.get(id);
  if (photo instanceof Promise) { photo = await photo; photoCache.set(id, photo); }
  if (!photo) return;
  if (image) {
    image.onerror = () => { image.hidden = true; image.closest(".photo-frame")?.classList.remove("has-photo"); };
    image.referrerPolicy = "no-referrer";
    image.src = photo.url;
    image.alt = `${place.place_name}, ${place.city}`;
    image.hidden = false;
    image.closest(".photo-frame")?.classList.add("has-photo");
  }
  if (credit) credit.innerHTML = `Photo: <a href="${escapeHtml(photo.page)}" target="_blank" rel="noopener">${escapeHtml(photo.title)}</a> · ${escapeHtml(photo.artist)} · ${escapeHtml(photo.license)}`;
  return photo;
}

function requestPhoto(place, container) {
  const image = container.querySelector("img[data-place-photo]");
  const credit = container.querySelector("[data-photo-credit]");
  if (image) placePhoto(place, image, credit);
}

function scoreValue(place) {
  const score = Number(place.score ?? place.ranking_score ?? 0);
  return Number.isFinite(score) ? score : 0;
}

function cardMarkup(place, index) {
  const categories = categoriesOf(place);
  const category = categories[0] || "Place to explore";
  const score = scoreValue(place);
  const scorePercent = Math.max(0, Math.min(100, score * 100));
  const rating = Number(place.rating);
  const ratingMarkup = Number.isFinite(rating) && rating > 0 ? `<span>★</span> ${rating.toFixed(1)}` : "Not rated";
  return `<article class="place-card">
    <button class="place-visual photo-frame" data-kind="${kindFor(place)}" type="button" data-place-id="${escapeHtml(place.place_id)}" aria-label="Preview ${escapeHtml(place.place_name)}"><div class="visual-sun"></div><div class="visual-ridge"></div><img data-place-photo alt="" loading="lazy" hidden /><span class="rank-badge"><span>✳</span> ${index === 0 ? "TOP MATCH" : `#${String(index + 1).padStart(2, "0")}`}</span><span class="image-hint">View destination <span aria-hidden="true">↗</span></span></button>
    <div class="place-body">
      <div class="place-meta"><span class="place-category">${escapeHtml(category)}</span><span class="place-rating">${ratingMarkup}</span></div>
      <h3>${escapeHtml(place.place_name)}</h3>
      <p class="place-location">⌖ ${escapeHtml(place.city)}${place.state ? `, ${escapeHtml(place.state)}` : ""}</p>
      <p class="place-description">${escapeHtml(place.description || "Explore this destination and learn more about what makes it special.")}</p>
      <div class="place-card-bottom"><span class="place-fee"><small>ENTRY</small>${feeLabel(place)}</span><button class="details-button" type="button" data-place-id="${escapeHtml(place.place_id)}">Photo & details <span aria-hidden="true">→</span></button></div>
      <div class="score-strip" aria-label="Match score ${scorePercent.toFixed(0)} percent"><span>Match</span><span class="score-track"><span class="score-fill" style="display:block;width:${scorePercent}%"></span></span><span class="score-value">${score.toFixed(2)}</span></div>
    </div>
  </article>`;
}

function renderResults(places, isDemo) {
  currentPlaces = places;
  elements.demoNotice.hidden = !isDemo;
  elements.grid.setAttribute("aria-busy", "false");
  elements.count.textContent = `${places.length} ${places.length === 1 ? "PLACE" : "PLACES"} TO EXPLORE`;
  elements.grid.innerHTML = places.map(cardMarkup).join("");
  elements.empty.hidden = places.length > 0;
  elements.grid.hidden = places.length === 0;
  if (places.length) {
    elements.grid.querySelectorAll("[data-place-id]").forEach(button => button.addEventListener("click", () => showPlace(button.dataset.placeId)));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const place = places.find(item => String(item.place_id) === entry.target.dataset.photoFor);
      if (place) requestPhoto(place, entry.target);
    }), { rootMargin: "180px" });
    elements.grid.querySelectorAll(".photo-frame").forEach(frame => { frame.dataset.photoFor = frame.dataset.placeId; observer.observe(frame); });
  }
}

async function runSearch() {
  const filters = readFilters();
  elements.grid.setAttribute("aria-busy", "true");
  elements.grid.innerHTML = "";
  try {
    const payload = await searchPlaces(filters);
    if (payload.weights) currentWeights = payload.weights;
    renderResults(payload.results, false);
  } catch {
    currentWeights = { rating: 0.5, popularity: 0.3, preference: 0.2 };
    const preferred = normalize(filters.preferredCategory);
    const results = sortDemo(demoPlaces.filter(place => matchesDemo(place, filters)).map(place => {
      const components = {
        rating: Number(place.rating) / 5,
        popularity: Number(place.popularity) / 100,
        preference_match: !preferred || categoriesOf(place).some(category => normalize(category) === preferred) ? 1 : 0
      };
      return { ...place, score_components: components, score: components.rating * currentWeights.rating + components.popularity * currentWeights.popularity + components.preference_match * currentWeights.preference };
    }), filters.sort);
    renderResults(results, true);
  }
}

function showPlace(id) {
  const place = currentPlaces.find(item => String(item.place_id) === String(id));
  if (!place) return;
  const score = scoreValue(place);
  const parts = place.score_components || {};
  elements.placeDialogContent.innerHTML = `<div class="dialog-visual photo-frame" data-kind="${kindFor(place)}"><div class="visual-sun"></div><div class="visual-ridge"></div><img data-place-photo alt="" hidden /><span class="image-hint">Destination photo</span></div>
    <div class="dialog-content"><p class="photo-credit" data-photo-credit>Finding a photo for this destination…</p><p class="section-kicker">${escapeHtml(categoriesOf(place).join(" · ") || "DESTINATION")}</p><h2 id="dialogTitle">${escapeHtml(place.place_name)}</h2><p class="place-location">⌖ ${escapeHtml(place.city)}${place.state ? `, ${escapeHtml(place.state)}` : ""}</p><p>${escapeHtml(place.description || "More destination information will be added by the administrator.")}</p>
    <div class="dialog-facts"><div class="dialog-fact"><span>Visitor rating</span><strong>${Number(place.rating) > 0 ? `★ ${Number(place.rating).toFixed(1)} / 5` : "Not rated"}</strong></div><div class="dialog-fact"><span>Popularity</span><strong>${Number.isFinite(Number(place.popularity)) ? `${Number(place.popularity)} / 100` : "Not listed"}</strong></div><div class="dialog-fact"><span>Entry fee</span><strong>${feeLabel(place)}</strong></div></div>
    <div class="score-breakdown"><h3>Ranking factors <strong>Score ${score.toFixed(3)}</strong></h3><div class="breakdown-row"><span>Rating factor × weight (${Number(currentWeights.rating).toFixed(2)})</span><strong>${(Number(parts.rating ?? 0) * Number(currentWeights.rating)).toFixed(3)}</strong></div><div class="breakdown-row"><span>Popularity factor × weight (${Number(currentWeights.popularity).toFixed(2)})</span><strong>${(Number(parts.popularity ?? 0) * Number(currentWeights.popularity)).toFixed(3)}</strong></div><div class="breakdown-row"><span>Preference factor × weight (${Number(currentWeights.preference).toFixed(2)})</span><strong>${(Number(parts.preference_match ?? 0) * Number(currentWeights.preference)).toFixed(3)}</strong></div></div></div>`;
  elements.placeDialog.showModal();
  requestPhoto(place, elements.placeDialogContent);
}

function renderSuggestions() {
  const query = normalize(elements.query.value);
  if (query.length < 2) { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); return; }
  const matches = demoPlaces.filter(place => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(query) || query.split(" ").every(word => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(word))).slice(0, 5);
  elements.suggestions.innerHTML = matches.map(place => `<button class="suggestion-item" type="button" role="option" data-suggestion-id="${escapeHtml(place.place_id)}"><span class="suggestion-image photo-frame" data-kind="${kindFor(place)}"><img data-place-photo alt="" hidden /></span><span class="suggestion-label"><strong>${escapeHtml(place.place_name)}</strong><small>${escapeHtml(place.city)} · ${escapeHtml(categoriesOf(place)[0] || "Destination")}</small></span><span class="suggestion-arrow" aria-hidden="true">↗</span></button>`).join("");
  elements.suggestions.hidden = matches.length === 0;
  elements.query.setAttribute("aria-expanded", String(matches.length > 0));
  elements.suggestions.querySelectorAll("[data-suggestion-id]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.suggestionId;
    const place = demoPlaces.find(item => String(item.place_id) === id);
    elements.query.value = place?.place_name || "";
    elements.suggestions.hidden = true;
    elements.query.setAttribute("aria-expanded", "false");
    if (place) { currentPlaces = demoPlaces; showPlace(id); }
  }));
  elements.suggestions.querySelectorAll(".suggestion-item").forEach(button => {
    const place = demoPlaces.find(item => String(item.place_id) === button.dataset.suggestionId);
    if (place) requestPhoto(place, button);
  });
}

function clearFilters() {
  elements.form.reset();
  runSearch();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 4200);
}

async function openAdmin() {
  elements.adminMessage.textContent = "";
  elements.adminTools.hidden = true;
  elements.adminDialog.showModal();
  if (!adminToken) return;
  try {
    const response = await fetch(`${API_BASE}/auth/session`, { headers: { Authorization: `Bearer ${adminToken}` } });
    if (!response.ok) throw new Error("Your admin session has expired. Please sign in again.");
    const session = await response.json();
    if (session.role !== "admin") throw new Error("Admin access is required.");
    elements.adminTools.hidden = false;
    await loadAdminPlaces();
  } catch (error) {
    adminToken = "";
    sessionStorage.removeItem("yatraAdminToken");
    elements.adminMessage.textContent = error.message.includes("Failed to fetch") ? "Admin sign-in will be available when the Engine 2 API is connected." : error.message;
  }
}

function renderAdminPlaces(places) {
  const list = document.querySelector("#adminPlacesList");
  if (!places.length) {
    list.innerHTML = '<p class="catalogue-empty">No place records were returned.</p>';
    return;
  }
  list.innerHTML = places.map(place => `<article class="admin-place-row"><div><strong>${escapeHtml(place.place_name)}</strong><span>${escapeHtml(place.city)} · ${escapeHtml(categoriesOf(place).join(", "))}</span></div><div class="admin-place-actions"><button class="text-button" type="button" data-edit-place="${escapeHtml(place.place_id)}">Edit</button><button class="text-button deactivate-button" type="button" data-deactivate-place="${escapeHtml(place.place_id)}">Deactivate</button></div></article>`).join("");
  list.querySelectorAll("[data-edit-place]").forEach(button => button.addEventListener("click", () => beginEdit(button.dataset.editPlace)));
  list.querySelectorAll("[data-deactivate-place]").forEach(button => button.addEventListener("click", () => deactivatePlace(button.dataset.deactivatePlace)));
}

async function loadAdminPlaces() {
  const list = document.querySelector("#adminPlacesList");
  list.innerHTML = '<p class="catalogue-empty">Loading place records…</p>';
  try {
    const response = await fetch(`${API_BASE}/admin/places`, { headers: { Accept: "application/json", Authorization: `Bearer ${adminToken}` } });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "Could not load place records.");
    adminPlaces = Array.isArray(payload) ? payload : (payload.places || []);
    renderAdminPlaces(adminPlaces);
  } catch (error) {
    list.innerHTML = `<p class="catalogue-empty">${escapeHtml(error.message.includes("Failed to fetch") ? "Catalogue management will be available when the Engine 2 API is connected." : error.message)}</p>`;
  }
}

function beginEdit(placeId) {
  const place = adminPlaces.find(item => String(item.place_id) === String(placeId));
  if (!place) return;
  const form = document.querySelector("#placeForm");
  form.elements.place_id.value = place.place_id;
  form.elements.place_name.value = place.place_name || "";
  form.elements.city.value = place.city || "";
  form.elements.state.value = place.state || "Karnataka";
  form.elements.categories.value = categoriesOf(place).join(", ");
  form.elements.description.value = place.description || "";
  form.elements.entry_fee.value = place.entry_fee ?? 0;
  form.elements.rating.value = place.rating ?? "";
  document.querySelector("#placeSaveButton").innerHTML = 'Update place <span aria-hidden="true">→</span>';
  document.querySelector("#cancelEdit").hidden = false;
  document.querySelector("#placeName").focus();
}

async function deactivatePlace(placeId) {
  if (!window.confirm("Deactivate this place? It will no longer appear in public search.")) return;
  try {
    const response = await fetch(`${API_BASE}/admin/places/${encodeURIComponent(placeId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: "INACTIVE" })
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.message || "The place could not be deactivated.");
    showToast("Place deactivated.");
    await loadAdminPlaces();
    runSearch();
  } catch (error) {
    showToast(error.message.includes("Failed to fetch") ? "Place management will be available when the Engine 2 API is connected." : error.message);
  }
}

function resetPlaceForm() {
  const form = document.querySelector("#placeForm");
  form.reset();
  form.elements.place_id.value = "";
  document.querySelector("#placeSaveButton").innerHTML = 'Save place <span aria-hidden="true">→</span>';
  document.querySelector("#cancelEdit").hidden = true;
}

document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelector("#adminOpen").addEventListener("click", openAdmin);
elements.form.addEventListener("submit", event => { event.preventDefault(); runSearch(); });
elements.query.addEventListener("input", renderSuggestions);
elements.query.addEventListener("keydown", event => {
  if (event.key === "Escape") { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); }
  if (event.key === "ArrowDown" && !elements.suggestions.hidden) { event.preventDefault(); elements.suggestions.querySelector("button")?.focus(); }
});
elements.suggestions.addEventListener("keydown", event => {
  if (event.key === "Escape") { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); elements.query.focus(); }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    const buttons = [...elements.suggestions.querySelectorAll("button")];
    const index = buttons.indexOf(document.activeElement);
    const next = event.key === "ArrowDown" ? Math.min(index + 1, buttons.length - 1) : Math.max(index - 1, 0);
    if (buttons[next]) { event.preventDefault(); buttons[next].focus(); }
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".search-main-field")) { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); }
});
[elements.city, elements.category, elements.preference, elements.rating, elements.sort].forEach(control => control.addEventListener("change", runSearch));
elements.budget.addEventListener("change", runSearch);
document.querySelector("#clearFilters").addEventListener("click", clearFilters);
document.querySelector("#emptyClear").addEventListener("click", clearFilters);

document.querySelector("#adminLoginForm").addEventListener("submit", async event => {
  event.preventDefault();
  elements.adminMessage.textContent = "";
  const password = new FormData(event.currentTarget).get("password");
  try {
    const response = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ password }) });
    const payload = await response.json();
    if (!response.ok || payload.role !== "admin" || !payload.token) throw new Error(payload.message || "The server did not grant admin access.");
    adminToken = payload.token;
    sessionStorage.setItem("yatraAdminToken", adminToken);
    elements.adminTools.hidden = false;
    elements.adminMessage.textContent = "Admin access verified by the server.";
    await loadAdminPlaces();
  } catch (error) {
    elements.adminMessage.textContent = error.message.includes("Failed to fetch") ? "Admin sign-in will be available when the Engine 2 API is connected." : error.message;
  }
});

document.querySelector("#adminLogout").addEventListener("click", async () => {
  try { await fetch(`${API_BASE}/auth/logout`, { method: "POST", headers: { Authorization: `Bearer ${adminToken}` } }); } catch { /* The local token is still cleared. */ }
  adminToken = "";
  sessionStorage.removeItem("yatraAdminToken");
  elements.adminTools.hidden = true;
  adminPlaces = [];
  elements.adminMessage.textContent = "You are signed out.";
});

document.querySelector("#placeForm").addEventListener("submit", async event => {
  event.preventDefault();
  elements.placeMessage.textContent = "";
  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(formData.entries());
  const placeId = payload.place_id;
  delete payload.place_id;
  payload.entry_fee = Number(payload.entry_fee);
  payload.rating = Number(payload.rating);
  payload.categories = payload.categories.split(",").map(value => value.trim()).filter(Boolean);
  try {
    const response = await fetch(placeId ? `${API_BASE}/admin/places/${encodeURIComponent(placeId)}` : `${API_BASE}/admin/places`, { method: placeId ? "PATCH" : "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "The place could not be saved.");
    elements.placeMessage.textContent = placeId ? "Place updated." : "Place saved.";
    resetPlaceForm();
    await loadAdminPlaces();
    runSearch();
  } catch (error) {
    elements.placeMessage.textContent = error.message.includes("Failed to fetch") ? "Place management will be available when the Engine 2 API is connected." : error.message;
  }
});

document.querySelector("#cancelEdit").addEventListener("click", resetPlaceForm);

loadFilterOptions().finally(runSearch);
