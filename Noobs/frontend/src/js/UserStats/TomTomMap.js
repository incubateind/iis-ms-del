import React, { useEffect, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import DashboardCard from '../common/DashboardCard'
import useTheme from '@material-ui/core/styles/useTheme'

const routes = [
    '13.398186,52.507233:13.439606,52.513900:13.439710,52.497024:13.387620,52.492453:13.434757,52.496317:13.368580,52.505835',
    '13.376475,52.515963:13.376939,52.491463:13.409215,52.516387:13.442651,52.493725',
    '13.376475,52.515963:13.432700,52.486285:13.409215,52.516387:13.439606,52.513900:13.442651,52.493725',
    '13.376475,52.515963:13.376939,52.491463:13.409215,52.516387:13.442651,52.493725',
    '13.398186,52.507233:13.439606,52.513900:13.439710,52.497024:13.387620,52.492453:13.434757,52.496317:13.368580,52.505835',
]

const TomTomMap = ({ data }) => {
    const theme = useTheme()
    const filters = data.trips.map(t => {
        const start = new Date(t.readings[0].timestamp)
        const end = new Date(t.readings[t.readings.length - 1].timestamp)
        const format = date => {
            const hours = date.getHours()
            const minutes = date.getMinutes()
            return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
        }
        return `${format(start)} - ${format(end)}`
    })
    const [filter, setFilter] = useState(filters[0])

    useEffect(() => {
        function createMarkerElement(type) {
            const element = document.createElement('div')
            element.className = 'icon tt-icon-shield'
            const innerElement = document.createElement('div')
            innerElement.className = 'icon tt-icon-' + type

            element.appendChild(innerElement)

            return element
        }

        function addMarkers(feature) {
            var startPoint, endPoint;
            if (feature.geometry.type === 'MultiLineString') {
                startPoint = feature.geometry.coordinates[0][0]; //get first point from first line
                endPoint = feature.geometry.coordinates.slice(-1)[0].slice(-1)[0]; //get last point from last line
            } else {
                startPoint = feature.geometry.coordinates[0];
                endPoint = feature.geometry.coordinates.slice(-1)[0];
            }

            new tt.Marker({element: createMarkerElement('start')}).setLngLat(startPoint).addTo(map);
            new tt.Marker({element: createMarkerElement('end')}).setLngLat(endPoint).addTo(map);
        }

        function findFirstBuildingLayerId() {
            var layers = map.getStyle().layers;
            for (var index in layers) {
                if (layers[index].type === 'fill-extrusion') {
                    return layers[index].id;
                }
            }
            throw new Error('Map style does not contain any layer with fill-extrusion type.');
        }

        const map = tt.map({
            key: 'FVxG6T25bGz7k7RSL7q5Bq9ixnAaOsd0',
            style: 'tomtom://vector/1/basic-main',
            container: 'map2',
            zoom: 12,
            center: [13.445311, 52.498300]
        })
        map.on('load', function() {
            tt.services.calculateRoute({
                key: 'FVxG6T25bGz7k7RSL7q5Bq9ixnAaOsd0',
                traffic: false,
                locations: routes[filters.indexOf(filter)]
            })
            .go()
            .then(function(response) {
                var geojson = response.toGeoJson();
                map.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': {
                        'type': 'geojson',
                        'data': geojson
                    },
                    'paint': {
                        'line-color': theme.palette.primary[300],
                        'line-width': 6,
                    }
                }, findFirstBuildingLayerId());

                addMarkers(geojson.features[0]);

                var bounds = new tt.LngLatBounds();
                geojson.features[0].geometry.coordinates.forEach(function(point) {
                    bounds.extend(tt.LngLat.convert(point));
                });
                map.fitBounds(bounds, { duration: 0, padding: 50 });
            });
        })
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
    }, [filter])
    return (
        <DashboardCard title={'Map'} withFilter values={filters} current={filter} onChange={setFilter}>
            <div id='map2' style={{width: '100%', height: '400px'}}/>
        </DashboardCard>
    )
}

export default TomTomMap
