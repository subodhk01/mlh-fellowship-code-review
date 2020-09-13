import { loadFirebase } from '../lib/firebase'
import React from 'react'
import Loader from '../lib/loader';

const emptyValues = {
    name : "",
    email : "",
    mobile : "",
    city : "",
    propertyName : "",
    propertyAddress : "",
    message : "",
}

export default class ContactForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...emptyValues,
            result : "",
            error: false,
            processing: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({ [event.target.name] : event.target.value })
    }
    emptyFields(){
        this.setState({
            ...emptyValues
        })
    }
    async handleSubmit(event){
        this.setState({
            result: "",
            processing: true
        })
        event.preventDefault();
        let firebase = await loadFirebase();
        firebase.firestore().collection('restaurantLeads').add({
            contactPersonEmail : this.state.email,
            contactPersonName : this.state.name,
            contactPersonPhone : this.state.mobile,
            leadStatus : "Pending",
            restaurantName : this.state.propertyName,
            restaurantAddress : this.state.propertyAddress,
            restaurantCity : this.state.city,
            message : this.state.message,
            type : this.props.type
        })
        .then( () => {
                this.setState({
                    error: false,
                    processing: false,
                    result: "Your request has been successfully submitted."
                })
                this.emptyFields()
            }
        )
        .catch( (error) => {
            this.setState({
                error: true,
                processing: false,
                result: "Error submitting your request, try again."
            })
            this.emptyFields()
            console.log("error : ", error)
        })
    }
    render(){
        return (
            <div className="container-fluid no-gutter pt-4">
                <div className="inner text-center py-5 px-2 px-md-5 m-auto">
                    <form className="m-auto" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-xs-12 col-sm-6 pb-3 pb-md-0"><input className="form-control" type="text" placeholder="Name"
                                name="name" value={this.state.name} onChange={this.handleChange} required/></div>
                            <div className="col-xs-12 col-sm-6"><input className="form-control" type="email" name="email" placeholder="Email" 
                                value={this.state.email} onChange={this.handleChange} required/></div>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-12 col-sm-6 pb-3 pb-md-0"><input className="form-control" type="text" name="mobile" placeholder="Mobile No"
                                value={this.state.mobile} onChange={this.handleChange} required/></div>
                            <div className="col-xs-12 col-sm-6"><input className="form-control" type="text" name="city" placeholder="City" 
                                value={this.state.city} onChange={this.handleChange} required/></div>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="propertyName" placeholder="Property Name" 
                                value={this.state.propertyName} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="text" name="propertyAddress" placeholder="Property Address" 
                                value={this.state.propertyAddress} onChange={this.handleChange} required/>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="5" name="message" placeholder="Message" 
                                value={this.state.message} onChange={this.handleChange} required>
                            </textarea>
                        </div>
                        <div className={`text-center pb-2 ${ this.state.error ? 'text-danger' : 'text-success' }`}>
                            {this.state.result}
                        </div>
                        <div className="loaderContainer mt-1">
                            { this.state.processing ? <Loader /> : <button type="submit" className="btn btn-solid-reg">{this.props.buttonValue}</button> }
                        </div>
                    </form>
                </div>
                <style jsx>{`
                    form {
                        max-width: 500px;
                    }
                    .inner {
                        max-width: 1000px;
                        background: url("/images/bg/contact_bg.png");
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    .loaderContainer {
                        height: 50px;
                    }
                `}</style>
            </div>
        )
    }
}