const mainContainer = document.querySelector('.container');
const jobListSection = document.querySelector('.job-listing'); 
const filterModal = document.querySelector('.filter-modal');
const filterModalDetail = document.querySelector('.filter-modal-detail');
const filterModalClearData = document.querySelector('.clear-data');



let filterArr = [];
let filtermodalArr = [];

//Get API Data
async function jobListing() {
  // read our JSON
  let response = await fetch('jobs.json');
  let user = await response.json();
  return user;
}
//Creating Cards
jobListing().then(jobData =>{
      jobData.forEach(jobcardsEl => {
        //Create Element
        let jobCards = document.createElement('div');  
        let jobCardTextLeft = document.createElement('div');
        let jobCardTextRight = document.createElement('div');
        let jobProfile = document.createElement('div');
        let profileImg = document.createElement('img');
        let jobDetails = document.createElement('div'); 
        let companytDetail = document.createElement('div');
        let companyLb = document.createElement('label'); 
        let position = document.createElement('div'); 
        let jobWorkDetail = document.createElement('div'); 
        let postedLab = document.createElement('label'); 
        let contractLab = document.createElement('label'); 
        let locationLab = document.createElement('label'); 
        let jobFilter = document.createElement('label');
        //Add Element Class Name
        jobDetails.classList.add('job-details');
        jobCards.classList.add('job-cards');
        jobCards.classList.add('flex');
        jobCardTextLeft.classList.add('job-card-text-left');
        jobCardTextLeft.classList.add('flex');
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
        postedLab.innerHTML=jobcardsEl.postedAt;
        contractLab.innerHTML=jobcardsEl.contract;
        locationLab.innerHTML=jobcardsEl.location;
        let jobData =jobcardsEl.culture;

        jobData.forEach(jobDataEl=>{                     //culture
          let filterLab = document.createElement('label');
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
              filterModalLab.appendChild(filterModalIcon);
              filterModalLab.classList.add('filter-label-modal');
              filterModalDetail.append(filterModalLab);
              filterData();
            }           
          }) 
          jobFilter.append( filterLab);
        })
       
        //Append
        jobCards.appendChild(jobCardTextLeft);
        jobCardTextLeft.appendChild(jobProfile);
        jobProfile.appendChild(profileImg);
        jobDetails.appendChild(companytDetail);
        companytDetail.appendChild(companyLb);
        jobDetails.appendChild(position);
        jobDetails.appendChild(jobWorkDetail);
        jobWorkDetail.appendChild(postedLab);
        jobWorkDetail.appendChild(contractLab);
        jobWorkDetail.appendChild(locationLab);
        jobCardTextLeft.appendChild(jobDetails);
        jobCards.appendChild(jobCardTextRight);
        jobCardTextRight.appendChild(jobFilter);
        jobListSection.appendChild(jobCards);
      });
   }) 

 //Clear filtermodal box
 filterModalClearData.addEventListener('click',()=>{
  filtermodalArr = [];
  filterModalDetail.innerHTML='';
  filterModalClearData.remove();
  filterData();
})

