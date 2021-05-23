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
  

  return { array : Array.from(array), objArray };
})();


const setToc = (function(){

  const { array, objArray } = {...htag};
  const innerHtml = objArray.map((item, idx) => {
    return `<li data-toc="${idx}" class="htag-level${item.level}">${item.textContent}</li>`;
  });

  const ul = document.querySelector('.toc > ul');
  ul.innerHTML = innerHtml.join('');
  
  /* index click event */
  ul.addEventListener('click', e => {
    if(e.target.tagName.toLocaleLowerCase() !== 'li') return;
    const toc = e.target.dataset.toc;
    array[toc].scrollIntoView();
  });

  /* setIdForHtag */  
  array.map((item, index) => {
    item.setAttribute('id', `htag-${index}`);
    if(index === 0){
      ul.querySelector(`li[data-toc="${index}"]`).classList.toggle('active');
    }
  });


  window.addEventListener('scroll', function(e) {
    
    const current = array.reduce((pre, next) => {
      if(pre.getBoundingClientRect().y > 0){
        return pre;
      }else if(pre.getBoundingClientRect().y <= 0 && next.getBoundingClientRect().y > 0){
        return pre;
      }else{
        return next;
      }
    });

    if(current){
      /* current h-tag에 색칠하기 */
      const number = current.getAttribute('id').replace('htag-', '');
      if(ul.querySelector('li.active')){
        ul.querySelector('li.active').classList.toggle('active');
      }
      ul.querySelector(`li[data-toc="${number}"]`).classList.toggle('active');
    }
  });


})();
