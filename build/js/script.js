var navMain=document.querySelector(".main-nav"),navToggle=document.querySelector(".main-nav__toggle"),pageHeaderMobile=document.querySelector(".page-header__level--1");navMain.classList.remove("main-nav--nojs"),navToggle.addEventListener("click",function(){navMain.classList.contains("main-nav__closed")?(navMain.classList.remove("main-nav__closed"),navMain.classList.add("main-nav__opened"),pageHeaderMobile.classList.add("page-header__level--mobile")):(navMain.classList.add("main-nav__closed"),navMain.classList.remove("main-nav__opened"),pageHeaderMobile.classList.remove("page-header__level--mobile"))});