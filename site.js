(function(){
  var root=document.documentElement;
  var stored=null;
  try{stored=localStorage.getItem("ts-theme");}catch(e){}
  var systemDark=!!(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme",stored==="light"||stored==="dark"?stored:(systemDark?"dark":"light"));
  document.addEventListener("DOMContentLoaded",function(){
    var toggle=document.querySelector("[data-theme-toggle]");
    if(toggle){
      var updateLabel=function(){var dark=root.getAttribute("data-theme")==="dark";toggle.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme");toggle.setAttribute("title",dark?"Switch to light theme":"Switch to dark theme");};
      updateLabel();
      toggle.addEventListener("click",function(){
        var next=root.getAttribute("data-theme")==="dark"?"light":"dark";
        root.setAttribute("data-theme",next);
        try{localStorage.setItem("ts-theme",next);}catch(e){}
        updateLabel();
      });
    }
    var menuButton=document.querySelector("[data-menu-toggle]");
    var nav=document.querySelector("[data-site-nav]");
    if(menuButton&&nav){
      menuButton.addEventListener("click",function(){
        var open=nav.getAttribute("data-open")==="true";
        nav.setAttribute("data-open",open?"false":"true");
        menuButton.setAttribute("aria-expanded",open?"false":"true");
      });
      nav.addEventListener("click",function(event){
        if(event.target.closest("a")){nav.setAttribute("data-open","false");menuButton.setAttribute("aria-expanded","false");}
      });
    }
    var path=location.pathname.replace(/\.html$/,"").replace(/\/+$/,"")||"/";
    document.querySelectorAll("[data-nav-link]").forEach(function(link){
      var href=new URL(link.getAttribute("href"),location.origin).pathname.replace(/\.html$/,"").replace(/\/+$/,"")||"/";
      if(href===path||(href==="/projects"&&path.indexOf("/projects/")===0)){link.setAttribute("aria-current","page");}
    });
    document.querySelectorAll("[data-year]").forEach(function(el){el.textContent=String(new Date().getFullYear());});
  });
})();