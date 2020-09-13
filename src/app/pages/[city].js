import React from 'react'
import Router from 'next/router'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import HomeHero from '../components/HomeHero'
import HomeFlexiWorking from '../components/HomeFlexiWorking'
import Carousel from '../components/HomeCarousel'
import Featured from '../components/Featured'
import Listing from '../components/Listing'
import HomePromo from '../components/HomePromo'
import Contact from '../components/ContactFooter'
import { DebounceInput } from 'react-debounce-input';
import AsyncSelect from 'react-select/async';
import { loadFirebase } from '../lib/firebase'
import { capitalizeFirstLetter } from '../utils/functions'
import cookie from 'react-cookies'

// This gets called on every request
export async function getServerSideProps({ params, res }) {

  const getRestaurants = async (city) => {
      let firebase = await loadFirebase();
      let result = await new Promise((resolve, reject) => {
          firebase.firestore().collection('restaurants')
              .where('city', "==", city)
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
      return result;
  }

  const getCities = async() => {
      let firebase = await loadFirebase();
      let result = await new Promise((resolve, reject) => {
          firebase.firestore().collection('cities')
              .where('enabled',"==",true)
              .get()
              .then(snapshot => {
                  let items = [];
                  snapshot.forEach(doc => {
                      items.push(doc.data().name)
                  });
                  resolve(items);
              })
              .catch(error => {
                  console.log(error)
                  reject([]);
              });
      });
      return result;
  }

  const city = capitalizeFirstLetter(params.city)

  const cityList = await getCities();

  if (!(cityList.length && city && cityList.includes(city))) {
    if (res) {
      res.writeHead(301, {
        Location: '/'
      });
      res.end();
    }
  }

  let { restaurants, searchItems } = await getRestaurants(city);

  // Pass data to the page via props
  return { props: { restaurants, searchItems, cityList, city } }
}

export default function Template({ restaurants, searchItems, cityList, city }) {
    const router = useRouter()
    const [inputValue, setInputValue] = React.useState("")

    React.useEffect( () => {
        if(cityList.length && city) {
            cookie.save('city', city)
            cookie.save('firstVisit', 'done')
        }
    }, [cityList, city])

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
        <Layout fullScreenNav city={city}>
            <HomeHero>
                <div className="section-default home-search">
                    <AsyncSelect
                        cacheOptions
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
            <HomeFlexiWorking />
            <HomePromo />
            <Contact />
        </Layout>
    )
}
