import React from 'react'
import './style.css'

import Messages from '../MessagesField/MessagesField.jsx'
import Search from '../Search/Search.jsx'
import Header from '../Header/Header.jsx'
import { Container, Badge, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types'

//store
import { connect } from 'react-redux'

const HeadLogo = (props) => {
    let { logo } = props
    return (
      <Badge color="warning" className="headlogo">{ logo }</Badge>
    );
  }
  

class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    }

    static defaultProps = {
        chatId: 1,
    }
    
    render() {
        return(
            <Container fluid="lg" className="messengerContainer">
            <Row className="rowHead">
                <Col sm="2"  md="2" lg="3"><HeadLogo logo = 'Reactgram'/></Col>
                <Col sm="7"  md="6" lg="6"><Search/></Col>
                <Col sm="3"  md="4" lg="3"></Col>
            </Row>
            <Row>
                <Col sm={{ size: 7, offset: 2 }} md={{ size: 6, offset: 2 }} lg={{ size: 6, offset: 3 }} ><Header chatId = {this.props.chatId} /></Col>
            </Row>
            <Messages  usr = { this.props.usr } chatId = {this.props.chatId} />
          </Container>
        )
    }
}

const mapStateToProps = ({}) => ({})

export default connect(mapStateToProps)(Layout)