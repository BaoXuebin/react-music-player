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

    static last(id, musics) {
        const i = (this.index(id, musics) - 1) + musics.length;
        return musics[i % musics.length].id;
    }

    static next(id, musics) {
        const i = this.index(id, musics) + 1;
        return musics[i % musics.length].id;
    }

    static random(id, musics) {
        const len = musics.length;
        const r = Math.ceil(Math.random() * (len - 1));
        const i = this.index(id, musics) + r;
        return musics[i % len].id;
    }

    // 计算 musicId 在 musics 中的 index
    static index(id, musics) {
        let result = -1;
        musics.forEach((music, i) => {
            if (music.id === id) {
                result = i;
            }
        });
        return result;
    }

    static get(id, musics) {
        return musics.filter(music => music.id === id)[0];
    }
}

export default Utils;
