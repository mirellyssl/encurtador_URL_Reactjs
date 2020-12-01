import React from 'react';
import { ContentContainer, Form } from './style';
import Header from '../../components/Header';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import ShortenerService from '../../services/shortenerService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: ''
        };
    }
    copyToClipboard = () => {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        //Para que não seja enviado de novo
        const { url } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });

        if (!url) {
            this.setState({ isLoading: false, errorMessage: 'Informe uma URL para encurtar.' });
        } else {
            try {
                const service = new ShortenerService();
                const result = await service.generate({ url });

                this.setState({ isLoading: false, code: result.code });
            }
            catch (error) {
                this.setState({ isLoading: false, errorMessage: 'Ops, houve um erro ao tentar encurtar a URL' });
            }
        }

    }



    render() {
        const { isLoading, errorMessage, code } = this.state;
        return (
            <Container>
                <Header>Seu novo Encurtador de URL. :)</Header>
                <ContentContainer>
                    <Form onSubmit={this.handleSubmit}>
                        <InputGroup className="mb-5">
                            <FormControl placeholder="Digite a Url para encurtar" defaultValue="" onChange={e => this.setState({ url: e.target.value })} />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">
                                    Encurtar
                            </Button>
                            </InputGroup.Append>
                        </InputGroup>


                        {isLoading ? 
                        (
                            <Spinner animation="border" />
                        ) : 
                        (
                            code && (
                                <>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        autoFocus={true}
                                        defaultValue={`http://localhost:3000/${code}`}
                                        ref={(input) => this.inputURL = input}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>
                                                Copiar
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <p>Para acompanhar as estatísticas </p>
                                    <a href={`http://localhost:3000/${code}/stats`}>Clique aqui</a>
                                </>
                            )
                            )}
                            {errorMessage && <Alert variant="danger"> {errorMessage}</Alert>}
                    </Form>
                </ContentContainer>
            </Container>
        )
    }
}

export default HomePage;