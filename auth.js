<script>
const API="https://script.google.com/macros/s/AKfycbw_qfPCVJVNdTgEdbaKP8RnkA_l7COVoEKLvvpaIeWPvwrTDFYH9cF32mGP9Ow3MEAi7g/exec";
const INACTIVITY_LIMIT=5*60*1000;

function logout(){localStorage.clear();location.href="index.html";}

function updateActivity(){localStorage.setItem("lastActivity",Date.now());}
["click","mousemove","keydown","scroll"].forEach(e=>document.addEventListener(e,updateActivity));

setInterval(()=>{
  const last=localStorage.getItem("lastActivity");
  if(!last || Date.now()-last>INACTIVITY_LIMIT) logout();
},30000);

setInterval(()=>{
  const token=localStorage.getItem("sessionToken");
  if(!token) return;
  fetch(API,{method:"POST",body:JSON.stringify({action:"refresh",oldToken:token})})
  .then(r=>r.json())
  .then(res=>{if(res.success)localStorage.setItem("sessionToken",res.token); else logout();});
},20*60*1000);
</script>
