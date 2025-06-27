//theme toggle logic
const html = document.documentElement;
const themeToggleBtn = document.getElementById('theme_toggle');
const sunIcon = document.getElementById('sun_icon');
const moonIcon = document.getElementById('moon_icon');

function updateIcons(theme){
    //select relevant theme icon
    if(theme=== 'dark'){
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
    else{
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }   
}

themeToggleBtn.addEventListener('click',()=>{
    if(html.classList.contains('dark')){
        html.classList.remove('dark');
        localStorage.setItem('theme','light');
        updateIcons('light');
    }
    else{
        html.classList.add('dark');
        localStorage.setItem('theme','dark');
        updateIcons('dark');
    }
});

//load saved theme
const savedTheme = localStorage.getItem('theme');
if(savedTheme ==='dark'){
    html.classList.add('dark');
    updateIcons('dark');
}
else{
    html.classList.remove('dark');
    updateIcons('light');
}