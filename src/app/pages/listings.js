import Link from 'next/link'
import Layout from '../components/Layout'
import { Tag } from '../components/Tags'
import { ListItem } from '../components/Listing'
import { MdMap, MdFilterList, MdSort } from 'react-icons/md'
import { FaListUl } from 'react-icons/fa'
import Collapse from '@material-ui/core/Collapse'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { loadFirebase } from '../lib/firebase'
import FilterSideBar from '../components/FilterSideBar'
import { getCurrentCity } from '../utils/functions'
import { MAP_API_KEY } from '../utils/constants'

const mapStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: "500px",
    zIndex: 0
};

function Listings(props) {
    const [rests, setRests] = React.useState([])
    const [markers, setMarkers] = React.useState([])
    const [pins, setPins] = React.useState([])
    const [center, setCenter] = React.useState(null)
    const [mapInfo, setMapInfo] = React.useState({
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false
    })
    //const [ bounds, setBounds ] = React.useState(null)

    const [sort, setSort] = React.useState(true);
    const [filter, setFilter] = React.useState(false);
    const [map, setMap] = React.useState(false);

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
        <Layout>
            <div>
                <div className="d-flex d-sm-flex d-md-flex d-lg-none d-xl-none">
                    <div onClick={() => { setSort(!sort); setFilter(false); setMap(false) }}>
                        <Tag fontSize={1} isActive={sort}> <MdSort size="24" /> Sort </Tag>
                    </div>
                    <div onClick={() => { setFilter(!filter); setSort(false); setMap(false) }}>
                        <Tag fontSize={1} isActive={filter}><MdFilterList size="24" /> Filter</Tag>
                    </div>
                    <div onClick={() => { setMap(!map); setFilter(false); setSort(false) }}>
                        <Tag fontSize={1} isActive={map}><MdMap size="24" /> Map</Tag>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="bg-white d-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block border-right border-left sidebarContainer container-fluid p-0">
                        <FilterSideBar />
                    </div>
                    <div className="container-fluid p-0 d-flex flex-column">
                        <Collapse in={sort}>
                            <div className="py-2 border-top border-bottom d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center flex-wrap w-100">
                                    <div className="d-none d-sm-none d-md-none d-lg-inline-block d-xl-inline-block px-3">
                                        Sort By:
                                    </div>
                                    <div className="d-inline-block wrap-x-scroll">
                                        <SortBar />
                                    </div>
                                </div>
                                <div className="px-3 d-none d-sm-none d-md-none d-lg-block d-xl-block">
                                    <div className="btn btn-mapview d-flex align-items-center bg-white font-weight-bold" onClick={() => setMap(!map)}>
                                        { map ? 
                                            <>
                                                <div>
                                                    <FaListUl color="lightblue" size="20" />
                                                </div>
                                                <div style={{whiteSpace: "nowrap"}} className="ml-2">
                                                    List View
                                                </div>
                                            </>
                                        :
                                            <>
                                                <div>
                                                    <MdMap color="orange" size="24" />
                                                </div>
                                                <div style={{whiteSpace: "nowrap"}} className="ml-1">
                                                    View Map
                                                </div>
                                            </> 
                                        }
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse in={filter}>
                            <FilterSideBar />
                        </Collapse>
                        <div className={`mapContainer ${map ? "d-block" : "d-none"}`}>
                            {center ?
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

                                </Map> : ""
                            }
                        </div>
                        <div className={`py-3 px-0 px-md-3 ${map ? "d-none" : "d-block"}`}>
                            <section className="section-default section-listing">
                                <div className="row-listing row px-1 container">
                                    {rests.map((restaurant, index) =>
                                        <ListItem
                                            key={index}
                                            restaurant={restaurant}
                                        />
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                    <style jsx>{`
                        .sidebarContainer {
                            max-width: 400px;
                        }
                        .mapContainer {
                            height: 100%;
                        }
                        .btn-mapview {
                            font-size: 0.9rem;
                            padding: 0.45rem 1.1rem;
                            border-radius: 50px;
                            box-shadow: 0px 0px 5px -2px silver;
                            
                        }
                    `}</style>
                </div>
            </div>
        </Layout>
    )
}

export default GoogleApiWrapper({
    apiKey: MAP_API_KEY
})(Listings);

function SortBar() {
    return (
        <div>
            <Tag>Relevence</Tag>
            <Tag>Distance</Tag>
            <Tag>Popularity</Tag>
            <Tag>Price Low to High</Tag>
            <Tag>Price High to Low</Tag>
        </div>
    )
}

