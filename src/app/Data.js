// import Jimucanting from '../audio/吉姆餐厅.ogg';
// import JimucantingCover from '../image/吉姆餐厅.jpg';
// import Shanyinludexiatian from '../audio/山阴路的夏天.ogg';
// import ShanyinludexiatianCover from '../image/F.jpg';
// import Lilian from '../audio/莉莉安.ogg';
// import LilianCover from '../image/莉莉安.jpg';
import fetch from 'isomorphic-fetch';

export default class Data {
    constructor() {
        // this.root = 'http://www.xdbin.com/image/lab/player/';
        this.root = 'http://localhost:8080/selfworld/image/lab/player/';
        this.musics = this.musics();
        this.size = this.musics.length;
    }

    static fetch() {
        fetch('http://localhost:8080/selfworld/music')
            .then(response => response.json());
        // .then(json => console.log(json));
    }

    musics() {
        this.current = 1;
        return [
            // {
            //     id: 1,
            //     song: '吉姆餐厅',
            //     singer: '赵雷',
            //     src: Jimucanting,
            //     cover: JimucantingCover
            // },
            // {
            //     id: 2,
            //     song: '山阴路的夏天',
            //     singer: '李志',
            //     src: Shanyinludexiatian,
            //     cover: ShanyinludexiatianCover
            // },
            // {
            //     id: 3,
            //     song: '莉莉安',
            //     singer: '宋冬野',
            //     src: Lilian,
            //     cover: LilianCover
            // }
            {
                id: 1,
                song: '吉姆餐厅',
                singer: '赵雷',
                src: `${this.root}jmct.ogg`,
                cover: `${this.root}jmct.jpg`
            },
            {
                id: 2,
                song: '山阴路的夏天',
                singer: '李志',
                src: `${this.root}syldxt.ogg`,
                cover: `${this.root}syldxt.jpg`
            },
            {
                id: 3,
                song: '莉莉安',
                singer: '宋冬野',
                src: `${this.root}lla.ogg`,
                cover: `${this.root}lla.jpg`
            }
        ];
    }

    get(index) {
        if (index) {
            return this.musics[index];
        }
        return this.musics[this.current - 1];
    }

    getById(id) {
        const targets = this.musics.filter(music => music.id === id);
        if (targets.length > 0) {
            return targets[0];
        }
        return null;
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
