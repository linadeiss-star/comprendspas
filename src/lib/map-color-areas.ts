import L from 'leaflet';

// One grayscale overlay, with soft openings that merge as nearby areas overlap.
// The mask is drawn at quarter resolution; map tiles and pins stay full resolution.
export function addColorAreas(map: L.Map, locations: L.LatLng[]) {
  if (!CSS.supports('backdrop-filter', 'grayscale(1)')) return;
  const pane = map.createPane('colorAreas');
  pane.style.zIndex = '250';
  pane.style.pointerEvents = 'none';
  const overlay = L.DomUtil.create('div', 'map-color-areas', pane);
  overlay.setAttribute('aria-hidden', 'true');
  const mask = document.createElement('canvas');
  const context = mask.getContext('2d', { willReadFrequently: true });
  if (!context) return;

  function draw() {
    const size = map.getSize();
    if (!size.x || !size.y) return;
    mask.width = Math.ceil(size.x / 4);
    mask.height = Math.ceil(size.y / 4);
    overlay.style.width = `${size.x}px`;
    overlay.style.height = `${size.y}px`;
    L.DomUtil.setPosition(overlay, map.containerPointToLayerPoint([0, 0]));
    context!.globalCompositeOperation = 'lighter';
    for (const location of locations) {
      const point = map.latLngToContainerPoint(location).divideBy(4);
      const metersPerPixel = 40075016.686 * Math.cos(location.lat * Math.PI / 180) / (256 * 2 ** map.getZoom());
      const radius = 420 / metersPerPixel / 4;
      if (point.x < -radius * 2 || point.y < -radius * 2 ||
          point.x > mask.width + radius * 2 || point.y > mask.height + radius * 2) continue;
      const seed = location.lat * 13 + location.lng * 37;
      for (let lobe = 0; lobe < 6; lobe++) {
        const angle = seed + lobe * 2.4;
        const offset = lobe ? radius * (0.45 + 0.22 * Math.sin(seed + lobe * 7)) : 0;
        const x = point.x + Math.cos(angle) * offset;
        const y = point.y + Math.sin(angle) * offset;
        const reach = radius * (lobe ? 0.65 + 0.2 * Math.cos(seed + lobe) : 1);
        const gradient = context!.createRadialGradient(x, y, 0, x, y, reach);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(1, '#fff0');
        context!.fillStyle = gradient;
        context!.fillRect(x - reach, y - reach, reach * 2, reach * 2);
      }
    }
    const pixels = context!.getImageData(0, 0, mask.width, mask.height);
    for (let i = 3; i < pixels.data.length; i += 4) {
      const strength = Math.max(0, Math.min(1, (pixels.data[i] / 255 - 0.35) / 0.3));
      pixels.data[i] = Math.round(255 * (1 - strength * strength * (3 - 2 * strength)));
    }
    context!.putImageData(pixels, 0, 0);
    overlay.style.maskImage = `url("${mask.toDataURL()}")`;
    map.getContainer().classList.add('has-color-areas');
  }
  let frame = 0;
  function schedule() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  }
  map.on('move zoom resize', schedule);
  map.once('unload', () => { cancelAnimationFrame(frame); map.off('move zoom resize', schedule); });
  draw();
}
