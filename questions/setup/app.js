//using selectors inside the element
const questions=document.querySelectorAll('.question');
questions.forEach(function(question){ //prodjem kroz sva pitanja i stavim ih u foreach
    const btn=question.querySelector('.question-btn');//uzmem sve dugmice
    btn.addEventListener('click',function(){//za svaki namestim listener
        questions.forEach(function(item){ // kad je kliknuto dugme, proverava jel kliknuto isto pa onda gasi sve ostale
            if(item!==question){
                item.classList.remove('show-text');
            }
        })
      
      
      
      
        question.classList.toggle('show-text');//eto
    })
})







// traversing the dom

// const btns=document.querySelectorAll('.question-btn');
// btns.forEach(function(btn){
//     btn.addEventListener('click',function(e){
//         const question=e.currentTarget.parentElement.parentElement;
//         question.classList.toggle('show-text');
//     })
// })
 