import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: { Authorization: "foobar" }
});

export const output = text => {
   instance
    .post("/output", { text: text })
    .then(data => {
      // fs.writeFileSync('some.pdf',data.data)
      // fs.writeFileSync('./some.pdf', data.data)
    // ;
     
    // const arr = new Uint8Array(data.data);
    const blob = new Blob([data.data], { type: 'application/pdf' });

      var downloadLink = document.createElement('a')
            downloadLink.target = '_blank'
            downloadLink.download = 'sivasakthi12.pdf'       
            var URL = window.URL || window.webkitURL  
            var downloadUrl = URL.createObjectURL(blob)
            downloadLink.href = downloadUrl
            // window.open(downloadUrl);
            // document.body.append(downloadLink) // THIS LINE ISN'T NECESSARY
            downloadLink.click()
            // document.body.removeChild(downloadLink);  // THIS LINE ISN'T NECESSARY
            // URL.revokeObjectURL(downloadUrl);
      
      console.log("data1",data);
      return data;
    })
    .catch(err => {
      console.log("err", err);
    });
};
