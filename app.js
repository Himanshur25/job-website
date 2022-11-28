const mainContainer = document.querySelector('.container');
const jobListSection = document.querySelector('.job-listing'); 
const filterModal = document.querySelector('.filter-modal');
const filterModalDetail = document.querySelector('.filter-modal-detail');
const filterModalClearData = document.querySelector('.clear-data');


let filterArr = [];
let filtermodalArr = [];
fetch('job2.json').then(res=>res.json())
.then(jobData =>{
      jobData.forEach(jobcardsEl => {
        //Create Element
        const jobCards = document.createElement('div');  
        const jobCardTextLeft = document.createElement('div');
        const jobCardTextRight = document.createElement('div');
        const jobProfile = document.createElement('div');
        const profileImg = document.createElement('img');
        const jobDetails = document.createElement('div'); 
        const companytDetail = document.createElement('div');
        const companyLb = document.createElement('label'); 
        const position = document.createElement('div'); 
        const jobWorkDetail = document.createElement('div'); 
        const contractLab = document.createElement('label'); 
        const locationLab = document.createElement('label'); 
        const jobFilter = document.createElement('label');
        //Add Element Class Name
        jobDetails.classList.add('job-details');
        jobCards.classList.add('job-cards', 'flex');
        jobCardTextLeft.classList.add('job-card-text-left','flex');
        jobCardTextRight.classList.add('job-card-text-right');
        jobProfile.classList.add('job-profile');
        profileImg.classList.add('profile-img');
        companytDetail.classList.add('company-detail');
        position.classList.add('position');
        jobWorkDetail.classList.add('job-work-detail');
        jobFilter.classList.add('job-filter');

        //Get Data
        profileImg.src=jobcardsEl.logo;
        companyLb.innerHTML = jobcardsEl.company;
        position.innerHTML=jobcardsEl.position;
        contractLab.innerHTML=jobcardsEl.contract;
        locationLab.innerHTML=jobcardsEl.location;
        const jobData =jobcardsEl.culture;

        jobData.forEach(jobDataEl=>{                     //culture
          const filterLab = document.createElement('label');
          filterLab.classList.add('filter-label');
          filterLab.innerHTML=jobDataEl;
      
          //add eventlisner

          filterLab.addEventListener('click',(e)=>{
            filterModal.classList.add('flex');
            filterModal.style.display = 'flex';
        
            if(filtermodalArr.indexOf(e.target.firstChild.data)==-1){
              let filterModalLab =document.createElement('label'); 
              let filterModalIcon =document.createElement('span'); 
              filterModalIcon.classList.add('filter-modal-icon');
              filterModalIcon.innerHTML=`<i class="fa fa-times"></i>`;
              filtermodalArr.push(e.target.firstChild.data);
              filterModalLab.innerHTML=e.target.firstChild.data;
              filterModalLab.append(filterModalIcon);
              filterModalLab.classList.add('filter-label-modal');
              filterModalDetail.append(filterModalLab);
             filterData()
              filterModalIcon.addEventListener('click',(e)=>{
                e.target.parentElement.parentElement.remove();
                removText = e.target.parentElement.previousSibling.data;
                filtermodalArr.splice(filtermodalArr.indexOf(removText),1);
                filterData();
              })
            }           
          }) 
          jobFilter.append(filterLab);
        })
       
        //Append
        jobCards.append(jobCardTextLeft, jobCardTextRight);
        jobCardTextLeft.append(jobProfile,jobDetails);
        jobProfile.append(profileImg);
        jobDetails.append(companytDetail,position,jobWorkDetail);
        companytDetail.append(companyLb);
        jobWorkDetail.append(contractLab,locationLab);
        jobCardTextRight.append(jobFilter);
        jobListSection.append(jobCards);
      });
   }) 
   function filterData(){
    //filter Data
          const allJobCards = document.querySelectorAll('.job-cards');
          allJobCards.forEach(itemEl=>{
                let labelArr= [];
                itemEl.childNodes[1].childNodes[0].childNodes.forEach(sinaglItem =>{
                labelArr.push(sinaglItem.childNodes[0].data);
                });
                let flag=0;
              filtermodalArr.forEach(modalarrEL=>{
                if(flag==0){
                    if(labelArr.indexOf(modalarrEL)==-1){
                      flag=1;
                    }
                  }
              });
              if(flag==1){
                itemEl.style.display='none';
              }else{
                itemEl.style.display='flex';
              }
          });//close itemEl;
    }

 //Clear filtermodal box
 filterModalClearData.addEventListener('click',()=>{
  filtermodalArr = [];
  filterModalDetail.innerHTML='';
  filterModalClearData.remove();
  filterData();
})
