const htag = (function(){
  
  const content = document.querySelector('.entry-content');
  const array = content.querySelectorAll('.tt_article_useless_p_margin > h1, .tt_article_useless_p_margin > h2, .tt_article_useless_p_margin > h3, .tt_article_useless_p_margin > h4');


  let highestTagNum = null;
  const objArray = Array.from(array).map(item => {
    
    if(highestTagNum === null){
      highestTagNum = parseInt(item.tagName.substr(1));
    }else if(highestTagNum > parseInt(item.tagName.substr(1))){
      highestTagNum = parseInt(item.tagName.substr(1));
    }
    
    return { 'textContent' : item.textContent, 'tagNumber' : parseInt(item.tagName.substr(1)) };
  })
  .map(item => ({ ...item, level : item.tagNumber - highestTagNum + 1 }) );
  

  return objArray;
})();


const setToc = (function(){

  const array = [...htag];
  const innerHtml = array.map((item, idx) => {
    return `<li data-toc="${idx}" class="htag-level${item.level}">${item.textContent}</li>`;
  });

  const ul = document.querySelector('.toc > ul');
  ul.innerHTML = innerHtml.join('');
  
  ul.addEventListener('click', e => {
    if(e.target.tagName !== 'li') return;
    const toc = e.target.dataset.toc;
    htagList[toc].scrollIntoView();
  })

})();

