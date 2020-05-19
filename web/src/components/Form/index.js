import React, {Component} from 'react';

import './styles.css';

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            onSubmitForm: props.onSubmitForm,
            name: '',
            email: '',
            phone: '',
            description: '',
            street: '',
            number: '',
            district: '',
            city: '',
            next: null,
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const {
            onSubmitForm,
            name,
            email,
            phone,
            description,
            street,
            number,
            district,
            city,
        } = this.state;

        onSubmitForm({
            name,
            email,
            phone,
            description,
            address:{
                street,
                number,
                district,
                city,
            }
        })
    }

    render (){
        const {next} = this.state;
        return (
            <div className="form">
                <form method='post' onSubmit={this.onSubmit}>
                    {next ? (
                        <>
                            <input value={this.state.street} className="form-control" placeholder="Logradouro" onChange={e => this.setState({street: e.target.value})} />
                            <input value={this.state.number} className="form-control" placeholder="Núm." onChange={e => this.setState({number: e.target.value})} />
                            <input value={this.state.district} className="form-control" placeholder="Bairro" onChange={e => this.setState({district: e.target.value})} />
                            <input value={this.state.city} className="form-control" placeholder="Cidade" onChange={e => this.setState({city: e.target.value})} />
                            <div className="buttons">
                                <button type="button" onClick={()=>this.setState({next: false})}>Anterior</button>
                                <button type="submit">Solicitar</button>
                            </div>
                        </>
                    ):(
                        <>
                            <input value={this.state.name} className="form-control" placeholder="Nome" onChange={e => this.setState({name: e.target.value})} />
                            <input value={this.state.email} className="form-control" placeholder="Email" onChange={e => this.setState({email: e.target.value})} />
                            <input value={this.state.phone} className="form-control" placeholder="Telefone" onChange={e => this.setState({phone: e.target.value})} />
                            <textarea value={this.state.description} className="form-control" placeholder="Descrição do produto" onChange={e => this.setState({description: e.target.value})} />
                            <button type="button" onClick={()=>this.setState({next: true})}>Próximo</button>
                        </>
                    )}
                </form>
            </div>
        )
    }
}

export default Form;