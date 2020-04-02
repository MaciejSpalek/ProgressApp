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
}

export default new Helpers()