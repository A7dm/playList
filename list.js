const playButton = document.querySelector(".play-pauseButton")
const pauseButton = document.querySelector(".pauseButton")
const nextButton = document.querySelector(".nextButton")
const preButton = document.querySelector(".preButton")
const shuffleButton = document.querySelector(".shuffle")
const cQar = document.querySelector(".select-qar")
const audio = new Audio()
const List = document.querySelector(".List")

const parPro= document.querySelector(".progress-container")

let isP = false


const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration");


cQar.addEventListener("change" , () =>{
if(cQar.value==="عبد الرحمن الشرفي") {
aSurahs.surahs = [...qar1]
}else if(cQar.value==="أحمد بن طالب"){
  aSurahs.surahs = [...qar2]
}else if(cQar.value==="البراء الجعفري") {
 aSurahs.surahs = [...qar3]
}else{
  aSurahs.surahs = []
}


  currentTimeDisplay.innerHTML = "";
  durationDisplay.innerHTML = ""





audio.duration = null
aSurahs.currentTime=0
aSurahs.currentsurah=null;
pauseSurah()
getInfoOnScreen();
selectSurah();
addToList(sortSurhs());
})

const qare1 = "عبد الرحمن الشرفي"


const qar2 = [{
  id:0,
  surah:" سورة غافر",
  qar:"احمد بن طالب",
  time:"21:55",
  src:"surahs/غافر.mp3",
  sort:40
},{
   id:1,
  surah:"سورة الانبياء",
  qar:"أحمد بن طالب",
  time:"21:10",
  src:"surahs/الانبياء.mp3",
  sort:21
},{
   id:2,
  surah:"سورة الحج",
  qar:"أحمد بن طالب",
  time:"22:20",
  src:"surahs/الحج.mp3",
  sort:22
},{
  id:3,
  surah:"سورة طه",
  qar:"أحمد بن طالب",
  time:"21:25",
  src:"surahs/طه.mp3",
  sort:20
},{
id:4,
  surah:"سورة مريم",
  qar:"أحمد بن طالب",
  time:"17:07",
  src:"surahs/مريم.mp3",
  sort:19
}
]



const qar1 = [{
  id:0,
  surah:"سورة الإنفطار",
  qar:qare1,
  sort:82,
  src:"عبد الرحمن الشرفي/الإنفطار.mp3",
  time: "2:05"
},{
id:1,
  surah:" سورة الطارق",
  qar:qare1,
  sort:86,
  src:"عبد الرحمن الشرفي/الطارق.mp3",
  time: "1:29"
},{
  id:2,
  surah:"سورة الضحى",
  qar:qare1,
  sort:93,
  src:"عبد الرحمن الشرفي/الضحى.mp3",
  time: "1:02"
},{
  id:3,
  surah:"سورة الشرح",
  qar:qare1,
  sort:94,
  src:"عبد الرحمن الشرفي/الشرح.mp3",
  time: "00:42"
},{
  id:4,
  surah:"سورة العاديات",
  qar:qare1,
  sort:100,
  src:"عبد الرحمن الشرفي/العاديات.mp3",
  time: "01:01"
},{
   id:5,
  surah:" سورة القارعة",
  qar:qare1,
  sort:101,
  src:"عبد الرحمن الشرفي/القارعة.mp3",
  time: "00:49"
},{
  id:6,
  surah:"سورة الفيل",
  qar:qare1,
  sort:105,
  src:"عبد الرحمن الشرفي/الفيل.mp3",
  time: "00:34"
}
]


const qare3="البراء الجعفري"

const qar3 = [
  {
    id:0,
    surah:"سورة الفاتحة",
    qar:qare3,
    sort:1,
    src:"qar/البراء الجعفري/الفاتحة.mp3",
    time:"00:38"
  },{
    id:1,
    surah:"سورة الطارق",
    qar:qare3,
    sort:86,
    src:"qar/البراء الجعفري/الطارق.mp3",
    time:"01:20"
  },{
     id:2,
    surah:"سورة الهمزة",
    qar:qare3,
    sort:104,
    src:"qar/البراء الجعفري/الهمزة.mp3",
    time:"00:40"
  }
]


let aSurahs = {
  surahs:[],
  currentsurah:null,
  currentTime:0
}



const addToList = (id) =>{
  const surah = id.map((s)=> {
    return`
    <button class=list-button onclick="playSurah(${s.id})">
    <li class="li-${s.id} li-list">
    <span class="list-surahName">${s.sort}-${s.surah}</span>
    <div class="left-info">
    <span class="list-qarName">${s.qar}</span>
    <span class="list-time">${s.time}</span>
    </div>
    </li>
    </button>
    `
  }).join("")

  List.innerHTML=surah
}




const sortSurhs = () => {
aSurahs.surahs.sort((a,b) =>{
if (a.sort> b.sort) {
  return 1;
} else if(a.sort<b.sort){
  return -1
}
return 0;
});
return aSurahs.surahs;
}



const playSurah = (id)=>{
const surah = aSurahs.surahs.find((surah)=> surah.id === id);
audio.src=surah.src
audio.title=surah.surah

if(aSurahs?.currentsurah === null || aSurahs?.currentsurah.id !== id){
  audio.currentTime=0
} else {
  audio.currentTime  = aSurahs.currentTime
}
aSurahs.currentsurah = surah;
playButton.classList.add("playing")


//عداد التقدم
parPro.style.display="block"



// الوقت
audio.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});


audio.addEventListener("loadedmetadata", () => {
  durationDisplay.textContent = formatTime(audio.duration);
});




isP=true
getInfoOnScreen()
selectSurah()

audio.play();
}


playButton.addEventListener("click" , () => {
  if(!isP){
  if (aSurahs.currentsurah === null) {
    playSurah(aSurahs.surahs[0].id)
  } else {
    playSurah(aSurahs.currentsurah.id)
  }
} else {
  pauseSurah();
}
/*
if (isP === true) {
  playButton.innerHTML ="&#9658"
} else {
  playButton.innerHTML ="&#9208"
}*/
})

const pauseSurah= () => {
  playButton.classList.remove("playing");
  aSurahs.currentTime = audio.currentTime
  getInfoOnScreen();
  isP=false


  parPro.style.display="none"


  audio.pause()
}

//pauseButton.addEventListener("click",pauseSurah)


const getCurrentSurah = ()=> aSurahs.surahs.indexOf(aSurahs.currentsurah);


const nextSurah= () => {
  
  if (aSurahs?.currentsurah===null){
    playSurah(aSurahs.surahs[0].id)
  } else {  
    playSurah(aSurahs?.surahs[getCurrentSurah() +1].id)
  }
}


nextButton.addEventListener("click", nextSurah)

const preSurah = () => {
   playSurah(aSurahs.surahs[getCurrentSurah() -1].id)
}

preButton.addEventListener("click", preSurah)


const getInfoOnScreen = () => {
const qName = document.querySelector(".qarName")
const sName = document.querySelector(".surahName")

if (aSurahs?.currentsurah !== null){
qName.innerHTML = aSurahs.currentsurah.qar
sName.innerHTML = aSurahs.currentsurah.surah
} else {
  qName.innerHTML = ""
sName.innerHTML = ""
}
}

const selectSurah = ()=>{
if (aSurahs?.currentsurah===null){
  return
}

const all = document.querySelectorAll(".li-list")
const a = document.querySelector(`.li-${aSurahs.currentsurah.id}`)

all.forEach((del)=>{
  del.classList.remove("surah-active")
})

a.classList.add("surah-active")
  
}


const shuffleSurah = () => {
  aSurahs.surahs.sort(()=> Math.random()-0.5)

aSurahs.currentTime=0;
  aSurahs.currentsurah=null;
  
currentTimeDisplay.innerHTML = "";
  durationDisplay.innerHTML = ""
  
  pauseSurah()
  getInfoOnScreen()
  selectSurah()
  

  addToList(aSurahs.surahs)

  currentTimeDisplay.innerHTML = "";
  durationDisplay.innerHTML = ""
}

shuffleButton.addEventListener("click", shuffleSurah)

audio.addEventListener("ended",()=>{

  const exist = aSurahs.surahs.length > getCurrentSurah() +1
  if(exist){
    nextSurah()
  } else {
    aSurahs.currentTime=0
    aSurahs.currentsurah=null
    pauseSurah()
    getInfoOnScreen()
    selectSurah()
  }
})










function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}






  const progressBar = document.querySelector(".progress-bar");

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
  }
});


progressBar.addEventListener("input", () => {
  if (audio.duration) {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }

  
});





parPro.style.display="none"



