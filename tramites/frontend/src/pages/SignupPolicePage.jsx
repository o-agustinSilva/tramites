import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import SignupPolice from "../components/SignupPolice";

export function SignupPolicePage(){
   return( 
         <div className="App">
          <Header/>
          <SignupPolice/>
          <Footer/>    
      </div>
   );

}