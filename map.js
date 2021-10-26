'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VubnlzaWRlciIsImEiOiJja3Y2M3g0NWMxZ2c1MzBxcDdvZzg1Z2owIn0.-In7HE_mYxuq_wgMcAI3Vg'


let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
//     style: 'mapbox://styles/mapbox/basic-v9',
// style: 'mapbox://styles/mapbox/outdoors-v10',
// style: 'mapbox://styles/mapbox/light-v9',
// style: 'mapbox://styles/mapbox/dark-v9',
// style: 'mapbox://styles/mapbox/satellite-v9',
// style: 'mapbox://styles/mapbox/satellite-streets-v10',
// style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
// style: 'mapbox://styles/mapbox/navigation-preview-night-v2',
// style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
// style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
// style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4'
    center: [-73.96024, 40.80877],
    zoom: 1,
    pitch: 45



///////////////////////////////////////////////////////////

})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')



//////////////////////////////////////////////////////////////
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})


////////////// event handlers

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})


/////marker

let marker = new mapboxgl.Marker()
marker.setLngLat([-73.96007,40.80871])
marker.addTo(map)


///// popup


// let popup = new mapboxgl.Popup()
// popup.setHTML('This is the Center for Spatial Research')
// marker.setPopup(popup)

let popup = new mapboxgl.Popup()
popup.setHTML('This is the Center for Spatial Research<br /><img src="https://currystonefoundation.org/wp-content/uploads/2018/05/csf_pr_csr_image5.jpg" />')
marker.setPopup(popup)


///////////////////////////////////////// multiple markers
let data = [
    {
        location: [129.31664,63.91334],
        content: 'I like to eat my lunch here'
    },
    {
        location: [-96.65325,49.11583],
        content: '15 years ago, you could see over the trees'
    },
    {
        location: [-73.96204,40.80994],
        content: 'This was once tennis courts'
    },
    ]

    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()
    marker.setLngLat(d.location)
    marker.addTo(map)

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})
