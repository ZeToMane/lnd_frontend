<template>
    <div class="map-background" ref="mapContainer"></div>
</template>


<script setup lang="ts">
import type { Object } from '~/assets/types'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null
let markers: L.Marker[] = []

const emit = defineEmits(['map-clicked'])

const customIcon = L.icon({
  iconUrl: '/map-marker-yellow.png',    // or '~/assets/my-marker.png' if bundling
  iconSize: [28, 48],           // adjust as needed
  iconAnchor: [14, 48],         // point of the icon which will correspond to marker's location
  popupAnchor: [0, -48]         // where the popup should open relative to iconAnchor
})

onMounted(() => {
    map = L.map(mapContainer.value!).setView([44.833328, -0.56667], 10)

    L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution:
            '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> ' +
            '&copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> ' +
            '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> ' +
            '&copy; <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap</a> contributors',
            ext: 'png'
    }as any).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        console.log('Map clicked at:', lat, lng)

        markers.forEach(marker => marker.remove())
        markers = []

        // Emit an event upward if you want the parent to handle it.
        emit('map-clicked', { lat, lng })

        // Optionally add a marker at the clicked location.
        const newMarker = L.marker([lat, lng], {icon: customIcon}).addTo(map!)
        newMarker.bindPopup('You clicked here!').openPopup()
        markers.push(newMarker)
    })
})
</script>

<style lang="scss" scoped>
.map-background {
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
}

</style>