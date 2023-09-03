
const btn=document.getElementById('short')
const api='https://api.shrtco.de/v2/shorten'
const urllist=document.getElementById('shorten')
const longurl=document.getElementById('inputlink')


btn.addEventListener('click',()=>{
   addlink()
   
   longurl.value="";
  
})
async function shorturl(longurl){
  const startTime = performance.now();
    try{
        const responce = await fetch(`${api}?url=${encodeURIComponent(longurl)}`)
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
       
        if (responce.ok){
            const data =await responce.json();
            const { short_link: shortUrl} = data.result;
            return [shortUrl,elapsedTime];
        }
        else{
           alert (responce.status)}
       
    }catch (error){
       alert(error);
        }
}

async function addlink(){
   const url=longurl.value
   const notvalidElements=document.querySelectorAll('#inputlink,#empty')
   const empty=document.getElementById('empty')
    if (url===''){
      
        notvalidElements.forEach(element=>{
          element.classList.toggle('notvalid')
        })
    }else{
    try {
      const [shorted,time] = await shorturl(url);
    document.getElementById('loader').style.display='block'
    setTimeout(function() {
      // Hide the loader
      document.getElementById('loader').style.display = 'none';
    }, time);
        
        if (shorted==undefined){
         const error=document.querySelectorAll('#notvalid,#inputlink')
         error.forEach(element=>{
          element.classList.toggle('notvalid')
        })
        }else{
        const listItem = createListItem(url, shorted);
        urllist.appendChild(listItem);}
      } catch (error) {
        alert(error);
      }}
}
function createListItem(longurl,shortenlink){
    const listItem = document.createElement('li')

    const spanshort=document.createElement('span')// to add the long and short likns in diffrent spans
    const spanlong=document.createElement('span')
    spanshort.className="short"
    spanlong.className='long' 
    
    listItem.className='tocopy'
    const shorten=document.createTextNode(shortenlink)
    const thelong=document.createTextNode(longurl)
    spanshort.appendChild(shorten)
    spanlong.appendChild(thelong)
    const copybtn=createBtn('copy',()=> copyToClipboard(shortenlink),'COPY')
    listItem.appendChild(spanlong)
    listItem.appendChild(spanshort)
    listItem.appendChild(copybtn)
    return listItem
}
function createBtn(className,onClick,text){
    const button=document.createElement('button')
    button.className=className
    button.innerText=text
    button.addEventListener('click',onClick);
    return button;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        const changebtn=document.querySelector('.copy')
        changebtn.style.backgroundColor='hsl(260, 8%, 14%)'
        changebtn.innerText="Copied!"
      
        console.log('Text copied to clipboard:', text);
        // Optionally, you can show a success message or perform other actions
      })
      .catch(error => {
        console.error('Error copying text to clipboard:', error);
        // Optionally, you can show an error message or perform other error handling
      });
  }

//save the url's in the local storage
document.addEventListener('DOMContentLoaded',()=>{
  saveUrls();
  function saveUrls(){
  const longUrl=[];

  const list=document.getElementById('shorten')
  
  const listUrls=list.getElementsByTagName('li')
  console.log("saveUrls function called");
  for (let i=0; i<listUrls.length ; i++){
    
     const url=listUrls[i]
      const longtext=url.textContent;
      console.log(longtext)
       longUrl.push(longtext)
      } 
      console.log(longUrl); 
      window.localStorage.setItem('longurl', JSON.stringify(longUrl))
 }
function getUrls(){
  const storedLong=window.localStorage.getItem('longurl')
  const storedShort=window.localStorage.getItem('shorturl')
}
})

  

  