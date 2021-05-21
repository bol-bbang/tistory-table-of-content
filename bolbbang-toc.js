const htag = (function(){

  const content = document.querySelector('.entry-content');
  const array = content.querySelectorAll('.tt_article_useless_p_margin > h1, .tt_article_useless_p_margin > h2, .tt_article_useless_p_margin > h3, .tt_article_useless_p_margin > h4');
  const tagNameArray = Array.from(array).map(item => item.tagName);
  
  return { array, tagNameArray };
})();


const setToc = (function(){

  const htagList = [...htag.array];
  const innerHtml = htagList.map((item, idx) => {
    return `<li data-toc="${idx}" class="htag-${item.tagName.toLowerCase()}">${item.textContent}</li>`;
  });

  const ul = document.querySelector('.toc > ul');
  ul.innerHTML = innerHtml.join('');
  
  ul.addEventListener('click', e => {
    if(e.target.tagName !== 'li') return;
    const toc = e.target.dataset.toc;
    htagList[toc].scrollIntoView();
  })

})();

