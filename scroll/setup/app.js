
// ********** set date ************
const date=document.getElementById('date');
date.innerHTML=new Date().getFullYear();


// ********** close links ************
const navToggle=document.querySelector('.nav-toggle');
const linksContainer=document.querySelector('.links-container');
const links=document.querySelector('.links');

//dinamicki odredjujem visinu kontejnera za linkove
navToggle.addEventListener('click',function(){
   //linksContainer.classList.toggle('show-links');
    //kolko je trenutno 
   const containerHeight=linksContainer.getBoundingClientRect().height;
    //kolko treba da bude kad  je otvoren
    const linksHeight=links.getBoundingClientRect().height;
    //ako je zatvoren stavi na kolko treba da bude a ako nije onda zatvori
    if(containerHeight===0){
        linksContainer.style.height=`${linksHeight}px`;
    }else {
        linksContainer.style.height=0;
    }

})

// ********** fixed navbar ************
//uzimam navbar i dugme za vracanje na top
const navbar=document.getElementById('nav');
const topLink=document.querySelector(".top-link");
//kad skrolujem
window.addEventListener('scroll',function(){
    //uzimam trenutnu poziciju 
    const scrollHeight=window.pageYOffset;
    //uzimam visinu navbara
    const navHeight=navbar.getBoundingClientRect().height;
    //kad prodjem visinu navbara moram da ga fixiram
    if(scrollHeight>navHeight){
        navbar.classList.add('fixed-nav');
    }else{  //ako ne onda ga odfixiram
        navbar.classList.remove('fixed-nav');
    }

    //kada ce se pojaviti back to top
    if(scrollHeight>500){
        topLink.classList.add('show-link');
    }else {
        topLink.classList.remove('show-link');
    }

})



// ********** smooth scroll ************
// select links
//default ponasanje kretanja linkova je sjebano zbog fixed navbara pa se ovde popravlja
const scrollLinks=document.querySelectorAll('.scroll-link');
scrollLinks.forEach(function(link){
    link.addEventListener('click',function(e){
        // prevent default behaviour
        e.preventDefault();
        // navigate to specific spot 
        //kliknem na dugme uzmem value id pa da mogu da nadjem posle gde treba da idem
        const id=e.currentTarget.getAttribute('href').slice(1);
        //uzmem i nadjem gde treba da budem zbog ove prole stvari
        const element=document.getElementById(id);
        // calculate the heights
        //ova 2 su ista prica ko malo pre
        const navHeight=navbar.getBoundingClientRect().height;
        const containerHeight=linksContainer.getBoundingClientRect().height;
        //ovde je boolean dal je fixed
        const fixedNav=navbar.classList.contains('fixed-nav');
        //ovde mora da se uracuna da je pozicija zapravo visa za navheight
        //pozicija elementa koji trazim
        let position = element.offsetTop - navHeight;


        //isk zbunjen sam al radi
        if(!fixedNav){
            position=position-navHeight;
        }
        if(navHeight>82){
            position=position+containerHeight;
        }



        //na kraju samo skrolujem dotle
        window.scrollTo({
            left:0,
            top:position
        });
        //i da ugasim toggle da ne smeta 
        linksContainer.style.height=0;
    });
});