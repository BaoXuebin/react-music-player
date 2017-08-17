import Jimucanting from '../src/audio/吉姆餐厅.mp3';
import Shanyinludexiatian from '../src/audio/山阴路的夏天.mp3';

export default class Data {
    constructor() {
        this.current = 1;
        this.musics = this.musics();
        this.size = this.musics.length;
    }

    musics() {
        this.current = 1;
        return [
            {
                song: '吉姆餐厅',
                singer: '赵雷',
                time: 355,
                src: Jimucanting
            },
            {
                song: '山阴路的夏天',
                singer: '李志',
                time: 278,
                src: Shanyinludexiatian
            }
        ];
    }

    get(index) {
        if (index) {
            return this.musics[index];
        }
        return this.musics[this.current - 1];
    }

    prev() {
        this.current = this.current - 1;
        if (this.current < 1) {
            this.current = this.size;
        }
        return this.musics[this.current - 1];
    }

    next() {
        this.current = this.current + 1;
        if (this.current > this.size) {
            this.current = 1;
        }
        return this.musics[this.current - 1];
    }

    random() {
        // e:
        // current 4
        // 1,2,3,4,5,6,7
        // r = 6
        const r = Math.ceil(Math.random() * (this.size - 1));
        // current = 10
        this.current = this.current + r;
        // 10 > 7 true
        if (this.current > this.size) {
            // current = 10 - 7
            this.current = this.current - this.size;
        }
        return this.musics[this.current - 1];
    }
}
