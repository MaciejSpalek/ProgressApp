import React, { Component } from "react";
import app from '../../Components/base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler } from '@fortawesome/free-solid-svg-icons'

class Measurements extends Component {
    constructor(props) {
        super(props)
        this.handleNewMeasurements = this.handleNewMeasurements.bind(this);
        this.state = {
            isPanelFormActive: true,
            buttonCaption: "Hide"
        }
    }


    handleNewMeasurements() {
        const { isPanelFormActive } = this.state;
        this.setState({
            isPanelFormActive: !isPanelFormActive
        })
        isPanelFormActive ? this.setState({buttonCaption: "Show"}) : this.setState({buttonCaption: "Hide"})
    }
    render() {
        const { isPanelFormActive, buttonCaption } = this.state;
        return (
            <section className="panel">
                <div className="panel__box">
                    <div className="panel__header">
                        <div className="header__title-box">
                            <FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:25}} />
                            <h2 className="header__caption">Measurements</h2>
                        </div>
                        <button className="form__button" onClick={this.handleNewMeasurements}>{ buttonCaption }</button>
                    </div>
                    { isPanelFormActive ? 
                    <form className="panel__form">
                        <label className="form__label"><input className="form__input" placeholder="Neck"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Chest"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Biceps"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Triceps"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Forearm"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Waist"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Thigh"/> cm </label>
                        <label className="form__label"><input className="form__input" placeholder="Calf"/> cm </label>
                        <button className="form__button form__button--save">Save</button>
                    </form> :null }
                </div>
            </section>
        );
    }
}

export default Measurements;