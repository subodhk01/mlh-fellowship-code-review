import React from 'react'
import Link from 'next/Link'
import { ListItem } from '../components/Listing'
import { getCurrentCity } from '../utils/functions'
import Loader from '../lib/loader'
import { loadFirebase } from '../lib/firebase'
import { MAP_API_KEY } from '../utils/constants'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: "500px",
    zIndex: 0
};

function MapView(props){
    const [rests, setRests] = React.useState([])
    const [markers, setMarkers] = React.useState([])
    const [pins, setPins] = React.useState([])
    const [center, setCenter] = React.useState(null)
    const [mapInfo, setMapInfo] = React.useState({
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false
    })
    const onMarkerClick = (props, marker) => {
        setMapInfo({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    };

    const onInfoWindowClose = () =>
        setMapInfo({
            activeMarker: null,
            selectedPlace: null,
            showingInfoWindow: false
        });

    const onMapClicked = () => {
        console.log("mapClicked")
    };
    const getRestaurants = async () => {
        let firebase = await loadFirebase();
        let mapPoints = []
        let markerArray = []
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('restaurants')
                .where('city', "==", getCurrentCity())
                .get()
                .then(snapshot => {
                    let items = [];
                    snapshot.forEach(doc => {
                        var temp = doc.data()
                        temp.location = { lat: temp.location.latitude, lng: temp.location.longitude }
                        mapPoints.push(temp.location)
                        markerArray.push(
                            <Marker
                                key={temp.id}
                                id={temp.id}
                                name={temp.name}
                                slug={temp.slug}
                                address={temp.address}
                                pricingText={temp.pricingText}
                                address={temp.address}
                                rating={temp.rating}
                                thumb={temp.thumb}
                                position={temp.location}
                                onClick={onMarkerClick}
                            />
                        )
                        items.push(doc.data());
                    });
                    resolve(items);
                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        return { result, mapPoints, markerArray }
    }
    const getAverage = (points) => {
        var sumLat = 0, sumLng = 0;
        points.map((item, index) => {
            sumLat += item.lat;
            sumLng += item.lng;
        })
        var average = {
            lat: sumLat / points.length,
            lng: sumLng / points.length
        }
        return average
    }
    React.useEffect(() => {
        async function mount() {
            let result = await getRestaurants();
            setRests(result.result)
            setMarkers(result.markerArray)
            setPins(result.mapPoints)
            let average = await getAverage(result.mapPoints)
            setCenter({
                lat: average.lat,
                lng: average.lng
            })
        }
        mount();
    }, [])
    return (
        <div>
            { center && 
                <Map
                    zoom={11}
                    google={props.google}
                    style={mapStyles}
                    initialCenter={center}
                    center={center}
                    onClick={onMapClicked}
                >
                    {markers}
                    <InfoWindow
                        marker={mapInfo.activeMarker}
                        visible={mapInfo.showingInfoWindow}
                        onClose={onInfoWindowClose}
                    >
                        {mapInfo.selectedPlace ?
                            <Link href={`/space/${mapInfo.selectedPlace.slug}`}>
                                <a>
                                    <ListItem
                                        full={true}
                                        restaurant={mapInfo.selectedPlace}
                                    />
                                </a>
                            </Link> : <></>
                        }
                    </InfoWindow>
                </Map>
            }
        </div>
    )
}

const LoadingContainer = (props) => (
    <div className="loadercontainer d-flex align-items-center">
        <Loader />
        <style jsx>{`
                .loadercontainer {
                    min-height: 600px;
                }
        `}</style>
    </div>
)

export default GoogleApiWrapper({
    apiKey: MAP_API_KEY,
    LoadingContainer: LoadingContainer
})(MapView);