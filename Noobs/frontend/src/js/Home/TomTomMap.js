import React, { useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import Grid from '@material-ui/core/Grid'
import DashboardCard from '../common/DashboardCard'

const TomTomMap = () => {
    useEffect(() => {
        // Update the document title using the browser API
        const map = tt.map({
            key: 'FVxG6T25bGz7k7RSL7q5Bq9ixnAaOsd0',
            style: 'tomtom://vector/1/basic-main',
            container: 'map',
            zoom: 10,
            center: [77.092104, 28.489730]
        });
        // const marker = new tt.Marker()
        //     .setLngLat([30.5, 50.5])
        //     .addTo(map);
        // const marker2 = new tt.Marker({width: 300, height: 30, color: '#ff55e8'})
        //     .setLngLat([35.52, 55.52])
        //     .addTo(map);
        // const marker3 = new tt.Marker({element: document.getElementById('marktest')})
        //     .setLngLat([35.54, 55.54])
        //     .addTo(map);
        const driver1 = new tt.Marker({color: '#5c0421'})
            .setLngLat([77.092104, 28.489730])
            .addTo(map);
        const driver2 = new tt.Marker({color: '#679223'})
            .setLngLat([77.034230, 28.445860])
            .addTo(map);
        const driver3 = new tt.Marker({color: '#d70aea'})
            .setLngLat([77.161298, 28.592176])
            .addTo(map);
        const driver4 = new tt.Marker({color: '#e950bf'})
            .setLngLat([77.223123, 28.640172])
            .addTo(map);
        const driver5 = new tt.Marker({color: '#4fed91'})
            .setLngLat([77.185314, 28.662892])
            .addTo(map);
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
    });
    return (
        <Grid container>
            <DashboardCard title={'Drivers Map'} CardProps={{ style: { width: '100%', marginTop: '16px' } }}>
                <div id='map' style={{width: '100%', height: '800px'}}/>
            </DashboardCard>
        </Grid>
    )
}

export default TomTomMap
