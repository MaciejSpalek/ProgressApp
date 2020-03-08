import React from "react"
import Data from '../../Components/data'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

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


class SaveBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleArrowButton = this.handleArrowButton.bind(this)
        this.state = {
            isSaveBoxHidden: props.isSaveBoxHidden
        }
    }

    getText = (bodyPartName, variable) => {
        if(variable !== "") {
            return `${bodyPartName}: ${variable}cm`;
        } else {
            return `${bodyPartName}: -`;
        }
    }
    handleArrowButton() {
        this.setState({
            isSaveBoxHidden: !this.state.isSaveBoxHidden
        })
    }
    render() {
        const { data, neck, chest, biceps, forearm, waist, thigh, calf } = this.props;
        return (
            <div className="saveBox">
                <div className="saveBox__header">
                    <Data data={data} />
                    <Button onClick={this.handleArrowButton}>
                        <FontAwesomeIcon 
                            icon={faAngleDown} 
                            transform={this.state.isSaveBoxHidden ? { rotate: 0 } : { rotate: 180 }} 
                            color="white" 
                            style={{fontSize:30}}
                        />
                    </Button>
                </div>
                { !this.state.isSaveBoxHidden ?
                <div className="saveBox__content">
                    <span className="saveBox__item">{this.getText("Szyja", neck)}</span>
                    <span className="saveBox__item">{this.getText("Klatka", chest)}</span>
                    <span className="saveBox__item">{this.getText("Ramię", biceps)}</span>
                    <span className="saveBox__item">{this.getText("Przedramię", forearm)}</span>
                    <span className="saveBox__item">{this.getText("Talia", waist)}</span>
                    <span className="saveBox__item">{this.getText("Udo", thigh)}</span>
                    <span className="saveBox__item">{this.getText("Łydka", calf)}</span>
                </div> : null
                }
            </div>
        )
    }
}

export default SaveBox;