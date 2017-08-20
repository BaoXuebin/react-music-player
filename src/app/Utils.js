class Utils {
    // int 转字符串，100 -> 1:40
    static parseTime(time) {
        let t = 0;
        if (time) {
            t = time;
        }
        let hour = parseInt(t / 3600, 10);
        hour = hour === 0 ? '' : `${hour}:`;
        const min = this.prefixInteger(parseInt((t % 3600) / 60, 10), 2);
        const sec = this.prefixInteger(parseInt(t % 60, 10), 2);
        return `${hour}${min}:${sec}`;
    }

    static prefixInteger(num, len) {
        return (Array(len).join('0') + num).slice(-len);
    }
}

export default Utils;
