import React from 'react'
import Router from 'next/router'
import Layout from '../components/Layout'
import HomeHero from '../components/HomeHero'
import CovidResponse from '../components/CovidResponse'
import HomeFlexiWorking from '../components/HomeFlexiWorking'
import Carousel from '../components/HomeCarousel'
import Featured from '../components/Featured'
import Listing from '../components/Listing'
import { FaSearch } from 'react-icons/fa'
import HomePromo from '../components/HomePromo'
import Contact from '../components/ContactFooter'
import { DebounceInput } from 'react-debounce-input';
import AsyncSelect from 'react-select/async';
import { loadFirebase } from '../lib/firebase'
import { getCurrentCity } from '../utils/functions'


export default function Template() {
    const [inputValue, setInputValue] = React.useState("")
    const [restaurants, setRestaurants] = React.useState([])
    const [searchItems, setSearchItems] = React.useState([])

    const getRestaurants = async () => {
        let firebase = await loadFirebase();
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('restaurants')
                .where('city', "==", getCurrentCity())
                .get()
                .then(snapshot => {
                  let searchItems = [];
                  let restaurants = [];
                  snapshot.forEach(doc => {
                      let temp = {
                          value: doc.data().slug,
                          label: doc.data().name + " : " + doc.data().address
                      }
                      let restaurant = doc.data();
                      restaurant.location = { lat: restaurant.location.latitude, lng: restaurant.location.longitude }
                      restaurants.push(restaurant)
                      searchItems.push(temp);
                  });
                  resolve({restaurants, searchItems});
                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        return result
    }

    React.useEffect( () => {
        async function mount(){
            let { restaurants, searchItems } = await getRestaurants();
            setRestaurants(restaurants)
            setSearchItems(searchItems)
        }
        mount();
    }, [])

    const filterRestaurants = (inputValue) => {
        return searchItems.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const searchRestaurants = async (inputValue) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterRestaurants(inputValue));
            }, 1000);
        });


    const customStyles = {
        control: styles => ({
            ...styles,
            borderRadius: 50,
            padding: "7px 20px"
        })
    }

    const handleInputChange = (value) => {
        Router.push(`/space/${value.value}`)
    }

    return (
        <Layout fullScreenNav>
            <HomeHero>
                <div className="section-default home-search">
                    {/* <form className="home-form">
                            <button type="submit"><FaSearch /></button>

                        </form> */}
                    {/* <DebounceInput
                            element={AsyncSelect}
                            cacheOptions
                            loadOptions={searchRestaurants}
                            styles={customStyles}
                            placeholder="Search the best places"
                            minLength={2}
                            debounceTimeout={300}
                            onChange={event => setInputValue(event.target.value)}
                        /> */}
                    <AsyncSelect
                        cacheOptions
                        defaultOptions={searchItems}
                        loadOptions={searchRestaurants}
                        styles={customStyles}
                        placeholder="Search the best spaces"
                        onChange={handleInputChange}
                        noOptionsMessage={() => "No such spaces available"}
                    />
                </div>
            </HomeHero>
            <Carousel />
            <Featured restaurants={restaurants} />
            <Listing restaurants={restaurants} />
            <CovidResponse />
            <HomeFlexiWorking />
            <HomePromo />
            <Contact />
        </Layout>
    )
}
