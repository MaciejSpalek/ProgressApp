
class Helpers {
    
    getCurrentDate = (separator='') => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    getFullDate = (separator="/") => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let minutes = newDate.getMinutes();
        return `${date}${separator}${ month<10 ? `0${month}` : month }${separator}${ year } ${ hour }:${ minutes<10 ? `0${minutes}` : minutes }`;
    }

    cutTimeFromDate(date) {
        return date.split(" ")[0];
    }

    snapshotToArray(snapshot) {
        const returnArr = [];
        snapshot.forEach(childSnapshot => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    }

    getAmountOfObjectProperties(object) {
        return Object.keys(object).length;
    } 

    capitalizeFirstLetter = (string) => {
        if(typeof string !== "undefined") {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    clearInput(input) {
        input.value = "";
    }

    isInputEmpty(input) {
        return input.value === "";
    }


    // for TrainingPlans folder (trainingDay.js & content.js)

    getSeries(array) {
        const tempArray = [];
        for(let series in array) {
            tempArray.push(array[series])
        }
        return tempArray;
    }
    getAmountOfSeries(array) {
        const tempArray = [];
        for(let series in array) {
            tempArray.push(array[series])
        }
        return tempArray.length;
    }
    getTreningVolume(array, type) {
        const tempArray = this.getSeries(array);
        if(type === "repsWithWeight") {
            return tempArray.reduce((volume, series) => volume + series.weight*series.reps, 0)
        } else if(type === "repsWithoutWeight") {
            return tempArray.reduce((volume, series) => volume + +series.reps, 0)
        } else {
            return tempArray.reduce((volume, series) => volume + +series.time, 0)
        }
    }

    getTrainingDays(array) {
        const allDays = [];
        
        array.forEach(day => {
            const oneDay = []
            for(let allSeries in day) {
                oneDay.push(day[allSeries])
            }
            allDays.push(oneDay)
        });
        return allDays;
    }
}

export default new Helpers()