import React from 'react';
import DayTable from './Table/table';


const TrainingDay = ({ id, type, trainingDay, trainingDays, amountOfSeries }) => {
    return (
        <DayTable 
            id={id}
            type={type} 
            trainingDay={trainingDay} 
            trainingDays={trainingDays}
            amountOfSeries={amountOfSeries}
        />
    )
}

export default TrainingDay;