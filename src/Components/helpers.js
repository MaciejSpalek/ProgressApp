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

}


export default new Helpers()