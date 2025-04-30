function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const regionName = getQueryParam('region');
if (!regionName) {
  alert('No region specified.');
  location.href = 'index.html';
}

const map = L.map('map', {
  zoomControl: true,
  attributionControl: false
});

const regionLayerGroup = L.layerGroup().addTo(map);

fetch('data/sgmap.json')
  .then(res => res.json())
  .then(data => {
    const features = data.features.filter(f => f.properties["Region Name"] === regionName);

    if (features.length === 0) {
      alert(`Region not found: ${regionName}`);
      location.href = 'index.html';
    }

    const merged = features.reduce((acc, f) => acc ? turf.union(acc, f) : f, null);
    const layer = L.geoJSON(merged, {
      style: {
        color: "#999",
        weight: 1,
        fillColor: "#ffeecc",
        fillOpacity: 0.3
      }
    }).addTo(regionLayerGroup);

    map.fitBounds(layer.getBounds());

    loadCatsForRegion(regionName, merged);
  });

function getRandomPointInPolygon(polygonFeature, maxAttempts = 10) {
  const polygon = polygonFeature.geometry;
  const bbox = turf.bbox(polygon);
  let attempts = 0;

  while (attempts < maxAttempts) {
    const pt = turf.randomPoint(1, { bbox }).features[0];
    if (turf.booleanPointInPolygon(pt, polygon)) {
      return [pt.geometry.coordinates[1], pt.geometry.coordinates[0]];
    }
    attempts++;
  }

  console.warn("Fallback to centroid.");
  return turf.centerOfMass(polygonFeature).geometry.coordinates.reverse();
}

function loadCatsForRegion(regionName, regionPolygon) {
  fetch('data/manifest.json')
    .then(res => res.json())
    .then(files => {
      files.forEach(filename => {
        fetch(`data/cats/${filename}`)
          .then(res => res.json())
          .then(cat => {
            const catRegion = (cat.region || '').toUpperCase() + ' REGION';
            if (catRegion === regionName) {
              const point = getRandomPointInPolygon(regionPolygon);
              L.marker(point, {
                icon: L.divIcon({
                  html: `<div><img src="cat_images/${cat.catId}.jpg" style="width:24px;height:24px;border-radius:50%;"></div>`,
                  className: 'cat-pin',
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })
              }).bindPopup(`
                <div style="width:150px">
                  <img src="cat_images/${cat.catId}.jpg" style="width:100%; border-radius:8px; margin-bottom:5px;">
                  <strong>${cat.name}</strong><br>
                  <em>Sex:</em> <span style="color: #888;">${cat.sex || 'N/A'}</span><br>
                  <em>Personality:</em> <span style="color: #888;">${cat.personality || 'N/A'}</span><br>
                  <em>Likes:</em> <span style="color: #888;">${cat.likes || 'N/A'}</span><br>
                  <em>Dislikes:</em> <span style="color: #888;">${cat.dislikes || 'N/A'}</span>
                </div>
              `).addTo(regionLayerGroup);
            }
          });
      });
    });
}
