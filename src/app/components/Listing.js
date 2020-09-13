import React from 'react'
import { loadFirebase } from '../lib/firebase'
import Router from 'next/router'
import { FaStar } from "react-icons/fa";
import { getCurrentCity } from '../utils/functions';

export default class Listing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items : props.restaurants || []
        }
    }

    async componentDidMount() {
      if (!this.state.items || this.state.items.length == 0) {
        let firebase = await loadFirebase();
        let result = await new Promise((resolve, reject) => {
            firebase.firestore().collection('restaurants')
                .where('city', "==", getCurrentCity())
                .get()
                .then(snapshot => {
                    let items = [];
                    snapshot.forEach(doc => {
                        items.push(doc.data());
                    });
                    resolve(items);
                })
                .catch(error => {
                    console.log(error)
                    reject([]);
                });
        });
        this.setState({items: result})
      }
    }

    render() {
        const restaurants = this.state.items;
        console.log(restaurants);
        return (
            <section className="section-default section-listing py-5">
                <div className="row-listing row container">
                    {restaurants.map( ( restaurant, index ) =>
                        <ListItem
                            key={index}
                            restaurant={restaurant}
                        />
                    )}
                </div>
            </section>
        )
    }
}

export function ListItem(props){
  const onRestaurantClicked = async () => {
    if(!props.noClick){
        (await loadFirebase()).analytics().logEvent('restaurantClick', {
            id: props.restaurant.id,
            name: props.restaurant.name,
        });
        Router.push(`/space/${props.restaurant.slug}`);
    }
  }
    return (
        <div className={`list-container ${props.full ? "col-12" : "col-sm-12 col-md-6"}`}>
            <div className={`list-item row cursor-pointer ${props.bordered ? "border" : ""}`} onClick={ () => onRestaurantClicked() }>
                <div className="list-rating"><FaStar />&nbsp;{props.restaurant.rating || "--"}</div>
                <div className="feat-image list-image col-4">
                    <img src={props.restaurant.thumb} />
                </div>
                <div className="list-content col-8">
                    <div className="feat-content">
                        <div className="feat-heading">
                            {props.restaurant.name}
                        </div>
                        <div className="feat-des">
                            {props.restaurant.address}
                        </div>
                        <div className="feat-price">
                            {props.restaurant.pricingText}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
