import React, { Component } from "react";
import app from '../../Components/base';
import Measurements from '../Measurements/measurements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faChartBar, 
    faStar, 
    faRuler, 
    faListOl, 
    faUsers, 
    faIdCard 
} from '@fortawesome/free-solid-svg-icons'

class Home extends Component {
    constructor(props) {
        super(props)
        this.measurements = this.measurements.bind(this);
        this.state = {
            isMeasurementsActive: false
        }
    }
    logout() {
        app.auth().signOut();
    }
 

    measurements() {
        this.setState({
            isMeasurementsActive: true
        })
    }
  
    render() {
        const {
            isMeasurementsActive
        } = this.state;
        return (
            <>
            <div className = "main">
                <div className="box">
                    <div className="box__item">
                        <FontAwesomeIcon icon={faIdCard} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Profile</h2>
                    </div>
                    <div className="box__item">
                        <FontAwesomeIcon icon={faListOl} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Current plan</h2>
                    </div>
                    <div className="box__item">
                        <FontAwesomeIcon icon={faUsers} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Friends</h2>
                    </div>
                    <div className="box__item">
                        <FontAwesomeIcon icon={faChartBar} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Diagrams</h2>
                    </div>
                    <div className="box__item">
                        <FontAwesomeIcon icon={faStar} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Records</h2>
                    </div>
                    <div className="box__item" onClick={this.measurements}>
                        <FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:80}} />
                        <h2 className="item__caption">Measurements</h2>
                    </div>
                </div>
                <button className="button__logout" onClick={this.logout}>Logout</button>
                {isMeasurementsActive ? <Measurements/> : null}
            </div>
            </>
        )
    }
}

export default Home;