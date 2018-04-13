window.addEventListener("load", () => {
    function handleNetworkChange(event) {
      if (navigator.onLine) {
          //alert("Welcome Back online :)")
      } else {
          alert("You are offline.App will now load data from cache!!")
      }
    }
  
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
});