class Utils {
    // int 转字符串，100 -> 1:40
    static parseTime(time) {
        let hour = parseInt(time / 3600, 10);
        hour = hour === 0 ? '' : `${hour}:`;
        let min = parseInt((time % 3600) / 60, 10);
        min = min === 0 ? '' : `${min}:`;
        const sec = time % 60;
        return `${hour}${min}${sec}`;
    }
}

export default Utils;
