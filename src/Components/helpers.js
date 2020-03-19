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

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
}


export default new Helpers()