import React, { Component } from "react";
import app from '../../Components/base';
import SaveBox from './saveBox';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  font-weight: bold;
  font-size: 1em;
  color: white;
  background-color: #FF8E00;
  border: none;
  width:35px;
  height: 35px;
  border-radius: .2em;
`;


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
            isSaveBoxHidden: false,
            neck: "",
            chest: "",
            biceps: "",
            waist: "",
            forearm: "",
            calf: "",
            thigh: ""
        }
    }

    componentDidMount() {
        console.log(this.getData())
        // this.setState({
        //     saveBoxes: this.getData()
        // })
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
        
        this.setState({
            isPanelFormActive: false,
            saveBoxes: [...saveBoxes, parameters]
        })
        this.updateSaveBoxes();
    }
    renderSaveBoxes = () => {
        const { saveBoxes, isSaveBoxHidden } = this.state;
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
                    isSaveBoxHidden={isSaveBoxHidden}
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
    getData() {
        app.getDatabase().collection('measurements').get().then(snapshot => {
            snapshot.forEach(x => {
                return x.data().saveArray
            })
        })
    }
    updateSaveBoxes() {
        const saveBoxDocument = app.getDatabase().collection('measurements').doc('saveBox');
        saveBoxDocument.set({
            "saveArray": this.state.saveBoxes
        })
    }
    render() {
        const { isPanelFormActive, neck, chest, biceps, waist, forearm, thigh, calf } = this.state;
        return (
            <section className="panel">
                <div className="panel__box">
                    <div className="panel__header">
                        <div className="header__title-box">
                            <FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:25}} />
                            <h2 className="header__caption">Wymiary</h2>
                        </div>
                        <Button onClick={this.handleNewMeasurements}>
                            <FontAwesomeIcon 
                                icon={faAngleDown} 
                                transform={!this.state.isPanelFormActive ? { rotate: 0 } : { rotate: 180 }}
                                color="white" 
                                style={{fontSize:30}}
                            />
                        </Button>
                    </div>
                    { isPanelFormActive ? 
                    <form className="panel__form">
                        <label className="form__label"><input className="form__input" name="neck" placeholder="szyja"  value={neck} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="chest" placeholder="klatka piersiowa" value={chest} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="biceps" placeholder="ramię" value={biceps} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="forearm" placeholder="przedramię" value={forearm} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="waist" placeholder="talia" value={waist} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="thigh" placeholder="udo" value={thigh} onChange={this.handleChange}/> cm </label>
                        <label className="form__label"><input className="form__input" name="calf" placeholder="łydka" value={calf} onChange={this.handleChange}/> cm </label>
                        <button className="form__button form__button--save" onClick={this.handleSaveButton}>Zapisz</button>
                    </form> :null }
                </div>
                {this.renderSaveBoxes()}
            </section>
        );
    }
}

export default Measurements;