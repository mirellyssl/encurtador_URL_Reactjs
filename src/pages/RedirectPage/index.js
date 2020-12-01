import React from 'react';
import { Container } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';
import Header from '../../components/Header';

class RedirectPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            errorMessage: ''
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;
        try {
            const service = new ShortenerService();
            const { url } = await service.getLink(code);
            window.location = url;
        } catch (error) {
            this.setState({isLoading: false, errorMessage: 'Ops, a URL solicitada não existe :/'});            
        }
    }

    render(){
        return (
            <Container>
                <Header>Redirecionando...</Header>
            </Container>
        )
    }
}

export default RedirectPage;