import bg from './bg_default.mp3'
import cut from './cut.wav'
import jump from './jump.mp3'
import pick from './pick.wav'
import right from './right.mp3'
import death from './death.wav'
import wrong from './wrong.wav'
import msg from './msg.wav'
import 'waud.js'

const sndCreator=(url,options)=>{
    return new Promise((reslove)=>{
        const snd=new WaudSound(url,Object.assign({},options,{
            onload:()=>{
                reslove(snd);
            }
        }));
    });
}

const {Waud,WaudSound}=window;
Waud.init();
Waud.enableTouchUnlock();
Waud.autoMute();

const bgSnd = sndCreator(bg, {
    "autoplay": false,
    "loop": true,
});

const sprites={
    cut:sndCreator(cut),
    jump:sndCreator(jump),
    pick:sndCreator(pick),
    right:sndCreator(right),
    death:sndCreator(death),
    wrong:sndCreator(wrong),
    msg:sndCreator(msg)
};

const cutSnd = sndCreator(cut);

export const bgPlay=()=>{
    bgSnd.then((snd)=>snd.play());
};

export const bgStop=()=>{
    bgSnd.then((snd)=>snd.stop());
};

export const spritePlay=(name)=>{
    const sprite=sprites[name];
    if(sprite){
        sprite.then((snd)=>snd.play());
    }
};



