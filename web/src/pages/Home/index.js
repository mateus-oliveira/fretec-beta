import React, {Component} from 'react';

import api from '../../services/api';

import image from '../../assets/logo.jpeg';

import Form from '../../components/Form';

import './styles.css';

class Home extends Component {
    onSubmitForm = data => {
        try {
            api.post('/request', data)
                .then(response => console.log(response))
        } catch (error){
            console.log(error)
        }
    }

    render (){
        return (
            <div className="global">
                <div className="container">
                    <img src={image} alt="Fretec" />
                    <Form onSubmitForm={this.onSubmitForm}/>
                </div>
            </div>
        )
    };
}

export default Home;