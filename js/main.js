const map = L.map('map', {
  zoomControl: false,
  attributionControl: false,
  dragging: true
});

const singaporeBounds = [[1.1305, 103.6], [1.4784, 104.1]];
map.fitBounds(singaporeBounds);

const regionCentroids = {
  "CENTRAL REGION": [1.297, 103.83],
  "NORTH REGION": [1.415, 103.808],
  "NORTH-EAST REGION": [1.378, 103.88],
  "EAST REGION": [1.345, 103.96],
  "WEST REGION": [1.345, 103.72]
};

// 区域名到图标文件名的映射
const regionIcons = {
  "CENTRAL REGION": "central.png",
  "NORTH REGION": "north.png",
  "NORTH-EAST REGION": "north_east.png",
  "EAST REGION": "east.png",
  "WEST REGION": "west.png"
};

fetch('data/sgmap.json')
  .then(res => res.json())
  .then(data => {
    const regionFeatures = data.features.filter(f =>
      f.properties["Region Name"] && f.properties["Region Name"].includes("REGION")
    );

    L.geoJSON(regionFeatures, {
      style: {
        color: "#ccc",
        weight: 1,
        fillOpacity: 0.1
      }
    }).addTo(map);

    Object.entries(regionCentroids).forEach(([region, coords]) => {
      const iconFile = regionIcons[region];
      if (!iconFile) return;

      L.marker(coords, {
        icon: L.divIcon({
          html: `<img src="assets/regions/${iconFile}" title="${region}" style="width:40px;">`,
          className: 'region-flag',
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        })
      }).on('click', () => {
        const query = encodeURIComponent(region);
        window.location.href = `region.html?region=${query}`;
      }).addTo(map);
    });
  });
