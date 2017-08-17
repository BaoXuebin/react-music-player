import Jimucanting from '../audio/吉姆餐厅.mp3';
import Shanyinludexiatian from '../audio/山阴路的夏天.mp3';
import ShanyinludexiatianCover from '../image/山阴路的夏天.jpg';
import Lilian from '../audio/莉莉安.ogg';

export default class Data {
    constructor() {
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
                src: Shanyinludexiatian,
                cover: ShanyinludexiatianCover
            },
            {
                song: '莉莉安',
                singer: '宋冬野',
                time: 253,
                src: Lilian
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
