let audio = document.getElementById('app');
let clickNghe=(key)=> {
    // console.log(`http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}`)
    
        fetch(`http://m.nhaccuatui.com/ajax/get-media-info?key1=${key}`).then(res => res.json()).then(obj=>{
            console.log(obj.data.location)
            document.getElementById("app").src = obj.data.location;
        })
    
}

let domain = "./manguon"
let getnhac = (kw) => {
    fetch(`${domain}?kw=${kw}`).then(res => res.json()).then((data) => {
        let nhac = document.getElementById('nhacmp3');
        nhac.innerHTML = ``
        data.forEach((d) => {
            let item = ``
            nhac.innerHTML += item

        //     let item2 = `<div class="package__container" id="">
        //     <div class="cover cover--6-month"></div>
        //     <div class="package__info">
        //         <div class="package__month">${d.tencasi}</div>
        //         <div class="package__line"></div>
        //         <div class="package__price">
        //             <div class="new-price">
        //                 <div class="before-dot">${d.tenbaihat}</div>                       
        //             </div>
                   
        //         </div>
        //     </div>
        //     <a class="package__btn" href="#" onclick="clickNghe('${d.keybaihat}')">Play</a>
        // </div>`
        let item2 =`<div class="song" onclick="clickNghe('${d.keybaihat}')">
        <div class="thumb" style="background-image: url('https://c.wallhere.com/photos/dc/6b/1920x1080_px_Alexandra_Stan_Beats_Blonde_celebrity_headphones_Photo_Manipulation_singer-585861.jpg!d')">
        </div>
        <div class="body" >
          <h3 class="title">${d.tenbaihat}</h3>
          <p class="author">${d.tencasi}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`
            nhac.innerHTML += item2
        })
    })
}
let clicksearch = () => {
    let click = document.getElementById("inputsearch").value;
     getnhac(click);
}
window.onload = () => {
    document.getElementById('search').addEventListener('click', function () {
        clicksearch();
    })
}
 let myplay=(div1)=>{
    console.log(div1)
    if(audio.paused){
        console.log(audio.paused)
        audio.play();
    div1.classList.add("playing");
// 
    }else{
        audio.pause();
        div1.classList.remove("playing");


    }
}
//tro ly ao 
// let SpeechRecognition = SpeechRecognition || webSpeechRecognition;
// const recognition = new SpeechRecognition();
// const microphone  = document.querySelector



