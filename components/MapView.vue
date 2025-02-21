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

const props = defineProps<{
    objects: Object[] | null
}>()

const emit = defineEmits(['marker-clicked'])

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

    if (props.objects) {
        addMarkers(props.objects)
    }

    watch(() => props.objects, (newObjects) => {
        if (!map) return
        // Remove existing markers
        markers.forEach(marker => marker.remove())
        markers = []

        // Add new markers if we have objects
        if (newObjects && newObjects.length) {
            addMarkers(newObjects)
        }
    })
})

function addMarkers(objs: Object[]) {
    objs.forEach(obj => {
        const marker = L.marker([obj.latitude, obj.longitude],{icon: customIcon}).addTo(map!)

        marker.on('click', () => {
            emit('marker-clicked', obj)
        })
        
        markers.push(marker)
    })
}
</script>

<style lang="scss" scoped>
.map-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0; /* If you want the map *behind* all other content */
}

</style>