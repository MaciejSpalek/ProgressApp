import React, {Component} from 'react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import { FlexComponent } from '../../../Components/styleHelpers'


const StyledContainer = styled(FlexComponent)`
    padding: 0;
`
class Chart extends Component {
    constructor(props) {
        super(props)
    }

    setChartData(xAxis, yAxis) {
        return {
            labels: xAxis,
            datasets: [
                {
                    label: "Objętość treningowa",
                    backgroundColor: "rgba(0, 92, 149, 0.5)",
                    data: yAxis
                }
            ]
        }
    }
    render() {
        const { trainingVolumes, trainingDays } = this.props;
        return (
            <StyledContainer>
                <Line 
                    options={{
                        responsive: true
                    }}
                    data={this.setChartData(trainingDays, trainingVolumes)}
                />
            </StyledContainer>
        )
    }
}

export default Chart;