const gParent = document.getElementsByClassName('grandParent')[0];
const audioTag = document.getElementsByClassName('audioTag')[0];
const conuntNum = document.getElementsByClassName('time')[0];
const innerBar = document.getElementById('innerBar');
const playbtn = document.getElementsByClassName('playbtn')[0];
const pausebtn = document.getElementsByClassName('pausebtn')[0];
const nextbtn = document.getElementsByClassName('nextbtn')[0];
const previousbtn = document.getElementsByClassName('previousbtn')[0];
let currentIndex = 0;
let dTime = '';
let durat = 0;
let isPlaying = false;
const trackArr = [
  { tid: 'music/track1.m4a', tname: 'Copines - Aya Nakanura' },
  { tid: 'music/track2.m4a', tname: 'Bombastic - Funky remix' },
  { tid: 'music/track3.m4a', tname: 'Cheating On You - Charlie Puth' },
  { tid: 'music/track4.m4a', tname: 'Love Aaj Kal - Chor Bazari' },
  { tid: 'music/track5.m4a', tname: 'Way Back Home - Shaun' },
];

for (let i = 0; i < trackArr.length; i++) {
  const parent = document.createElement('div');
  parent.addEventListener('click', () => {
    currentPlay(i);
    currentIndex = i;
  });
  parent.classList.add('parent');
  parent.textContent = (i + 1).toString() + '. ' + trackArr[i].tname;
  gParent.append(parent);
}

audioTag.addEventListener('loadeddata', () => {
  durat = Math.floor(audioTag.duration);
  dTime = updateTime(durat);
});

audioTag.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audioTag.currentTime);
  const cTime = updateTime(currentTime);
  conuntNum.textContent = cTime + ' / ' + dTime;
  updateBar(currentTime);
});

const updateBar = (cT) => {
  let barconunt = (500 / durat) * cT;
  innerBar.style.width = barconunt.toString() + 'px';
};

const updateTime = (totalsec) => {
  const min = Math.floor(totalsec / 60);
  const sec = totalsec % 60;
  const minText = min < 10 ? '0' + min.toString() : min;
  const secText = sec < 10 ? '0' + sec.toString() : sec;
  return minText + ':' + secText;
};

playbtn.addEventListener('click', () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    currentPlay(currentIndex);
  } else {
    audioTag.play();
    playing(isPlaying);
  }
});

pausebtn.addEventListener('click', () => {
  audioTag.pause();
  isPlaying = false;
  playing(isPlaying);
});

previousbtn.addEventListener('click', () => {
  if (currentIndex === 0) {
    return;
  } else {
    currentIndex -= 1;
    currentPlay(currentIndex);
  }
});

nextbtn.addEventListener('click', () => {
  if (currentIndex === trackArr.length - 1) {
    return;
  } else {
    currentIndex += 1;
    currentPlay(currentIndex);
  }
});

const playing = (now) => {
  if (now) {
    playbtn.style.display = 'none';
    pausebtn.style.display = 'inline';
  } else {
    pausebtn.style.display = 'none';
    playbtn.style.display = 'inline';
  }
};

const currentPlay = (cId) => {
  const plaudio = trackArr[cId].tid;
  audioTag.src = plaudio;
  audioTag.play();
  isPlaying = true;
  playing(isPlaying);
};
