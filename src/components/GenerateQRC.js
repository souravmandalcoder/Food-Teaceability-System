import QRCode from 'qrcode.react';
import React, { Component } from 'react';
//import {QRGenerator} from 'dynamic-qr-code-generator';

class GenerateQRC extends Component {
    
  getdata()
  {
    var val=localStorage.getItem("ingredients")
          let board = Array().map(row => new Array(2))
          var pname=val.split(",")
         // console.log(pname)
         var x=[]
          var c=0;
          for(let i=0; i<pname.length;i+=1){
            this.props.purchasedProducts.map((product, index) => {
              const p=JSON.stringify(product)
              //console.log(p)
              if(pname[i]==product.name && product.ownerName==localStorage.getItem('username')){
                x[++c]="Product Used: "+product.name+"\t Brand/Manufacturer: "+product.brand+" \t Purchase Date"+product.manudate+" \t Expiry Date: "+product.expdate+"\n"
                
              }
            })
          }
          localStorage.setItem("pdata",x)
  }
    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = localStorage.getItem('dishname');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };
      constructor(props) {
        super(props)
        
        this.state={
          count:0,
          ingredients:[]
        }

          this.download = this.downloadQR.bind(this);
          
        
      }
      render(){
        if(this.props.success){
          this.getdata()
          var data=localStorage.getItem("pdata")
                  
          return(
            <div id="content">
             <div >
         
         <QRCode
           id="123456"
           value={data}
           size={290}
           level={"H"}
           includeMargin={true}
         />
                 
       </div>
       <a onClick={this.downloadQR }>
    Download QR Code
  </a>
        
        
      </div>
       );
      }
      else{
        
        return (
          <div>
            <p>You must log in to view the page  
             </p>
            
          </div>
        );
      }
    }
}
export default GenerateQRC;
