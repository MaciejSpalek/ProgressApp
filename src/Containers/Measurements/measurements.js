import React, { Component } from "react";
import app from '../../Components/base';
import SaveBox from './saveBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faBicycle } from '@fortawesome/free-solid-svg-icons'

class Measurements extends Component {
    constructor(props) {
        super(props)
        this.handleNewMeasurements = this.handleNewMeasurements.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isPanelFormActive: true,
            buttonCaption: "hide",
            saveBoxes: [],
            neck: "",
            chest: "",
            biceps: "",
            waist: "",
            forearm: "",
            calf: "",
            thigh: ""
        }
    }
    handleSaveButton(e) {
        e.preventDefault();
        const { saveBoxes, neck, chest, biceps, waist, forearm, thigh, calf } = this.state;
        const parameters = {
            neck: neck,
            chest: chest,
            biceps: biceps,
            waist: waist,
            forearm: forearm,
            thigh: thigh,
            calf: calf
        }
        
        this.setState({saveBoxes: [...saveBoxes, parameters]})
    }
    renderSaveBoxes() {
        const { saveBoxes} = this.state;
        return saveBoxes.map((saveBox, index) => {
            return (
                <SaveBox 
                    neck={saveBox.neck}
                    chest={saveBox.chest}
                    biceps={saveBox.biceps}
                    forearm={saveBox.forearm}
                    waist={saveBox.waist}
                    thigh={saveBox.thigh}
                    calf={saveBox.calf}
                    key={index}
                /> 
            )
        })
    }
    handleNewMeasurements() {
        const { isPanelFormActive } = this.state;
        this.setState({
            isPanelFormActive: !isPanelFormActive
        })
        isPanelFormActive ? this.setState({buttonCaption: "show"}) : this.setState({buttonCaption: "hide"})
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { isPanelFormActive, buttonCaption, saveBoxes, neck, chest, biceps, waist, forearm, thigh, calf } = this.state;
        console.log(saveBoxes)
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
                        <label className="form__label"><input className="form__input" name="neck" placeholder="Neck"  value={neck} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="chest" placeholder="Chest" value={chest} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="biceps" placeholder="Biceps" value={biceps} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="forearm" placeholder="Forearm" value={forearm} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="waist" placeholder="Waist" value={waist} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="thigh" placeholder="Thigh" value={thigh} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="calf" placeholder="Calf" value={calf} onChange={this.handleChange}/> cm </label>
                        <button className="form__button form__button--save" onClick={this.handleSaveButton}>save</button>
                    </form> :null }
                    {this.renderSaveBoxes()}
                </div>
            </section>
        );
    }
}

export default Measurements;