export const getVerifyEmailTamplate = (name:string, verifyEmailURL:string) => {
  return `
    <!DOCTYPE html>
  <html>
  <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>SIH Verify email</title>
      <style>
          /* Base styles */
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              overflow-x: hidden;
          }
  
          .div1 {
              display: flex;
              flex-direction: column;
              align-items: center;
          }
  
          .div2 {
              background-color: white;
              max-width: 100%; /* Ensure content doesn't overflow on small screens */
              border-radius: 12px;
              margin: 1rem;
          }
  
          header {
              background-color: #1f4eac;
              color: white;
              text-align: center;
              padding: 2rem;
          }
          .head {
              display: flex;
              align-items: center;
              justify-content: center;
          }
          .head1 {
              width: 2rem; 
              margin-right: 0;
          }
          .head2 {
              width: 2rem; 
              margin-left: 0;
          }
          .logo {
              height: 2rem;
              width: 2.1rem;
          }
  
          .myPara,
          .pnew {
              font-size: 0.9rem;
              text-align: center;
          }
  
          .btn {
              margin: 1rem auto;
              height: 3rem;
              width:70%;
              max-width: 13.4rem;
              background-color: orangered;
              border: none;
              border-radius: 0.2rem;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              text-decoration: none;
          }
  
          .btn a {
              color: white;
              font-weight: 700;
          }
  
          .para-div {
              font-size: 0.9rem;
              margin: 1rem;
              text-align: center;
          }
  
          .bottom-div {
              margin: 1rem;
              background-color: #E6EAF5;
              padding: 1rem;
              max-width: 100%;
              flex-wrap: wrap;
          }
  
          .bottom-div h2,
          .bottom-div h3,
          .bottom-div p {
              text-align: center;
          }
  
          .social-icons {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 24px;
              padding-top: 1rem;
              max-width: 100%;
              flex-wrap: wrap;
          }
  
          .social-icons img {
              width: 2rem;
              align-items: center;
              justify-content: center;
          }
  
          h1 {
              font-family: 'Poppins', sans-serif;
              font-weight: bold;
              color: #003299;
              text-align: center;
          }
  
          .foot {
              background-color: #003299;
              color: white;
              text-align: center;
              padding: 7px;
              margin-left: 1rem;
              flex-wrap: wrap;
              width: 91.3%;
          }
          /* Media query for smaller screens */
          @media screen and (max-width: 768px) {
              .div2 {
                  width: 90%;
              }
              .head1 {
                width: 1.5rem; 
                margin-right: 0;
              }
              .head2 {
                 width: 1.5rem; 
                 margin-left: 0;
              }
              .btn {
                  width: 100%;
                  text-align: center;
                  justify-content: center;
                  align-items: center;
              }
              .btn a {
              color: white;
              font-weight: 600;
          }
              .para-div {
                  margin-left: 0;
                  text-align: center;
              }
              .bottom-div {
                flex-wrap: wrap;
          }
              .bottom-div h2,
              .bottom-div h3,
              .bottom-div p {
                  text-align: center;
              }
              
              .social-icons img {
                  width: 1.6rem;
                  align-items: center;
                  justify-content: center;
              }
              .foot {
              flex-wrap: wrap;
          }
          }
  
          /* Media query for even smaller screens, e.g., smartphones */
          @media screen and (max-width: 480px) {
              header {
                  padding: 1rem;
              }
              .head1 {
                width: 1rem; 
                margin-right: 0;
              }
              .head2 {
                 width: 1rem; 
                 margin-left: 0;
              }
              .logo {
                  height: 1.5rem;
                  width: 1.6rem;
              }
  
              .myPara,
              .pnew {
                  font-size: 0.8rem;
              }
  
              .btn {
                  height: 2.2rem;
                  width: 10.2rem;
                  text-align: center;
                  justify-content: center;
                  align-items: center;
              }
  
              .btn a {
                  font-size: 0.8rem;
              }
  
              .para-div {
                  font-size: 0.8rem;
              }
              .bottom-div {
                flex-wrap: wrap;
              }
              .bottom-div h2,
              .bottom-div h3,
              .bottom-div p {
                  font-size: 0.9rem;
              }
  
              .social-icons img {
                  width: 1.4rem;
                  align-items: center;
                  justify-content: center;
              }
              .foot {
              flex-wrap: wrap;
              }
              h1 {
                  font-size: 1.2rem;
              }
          }
      </style>
  </head>
  
  <body>
  
      <div class="div1">
          <div class="div2">
              <div class="name">
                  <h1>SIH Portal</h1>
              </div>
  
              <header>
                  <div class="head">
                      <hr class="head1">
                      <img class="logo" src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765719/mail_gzyman.png" alt="">
                      <hr class="head2">
                  </div>
  
                  <p style="font-size: .8em;">THANKS FOR SIGNING UP!</p>
                  <h3 style="font-size: 1.4em; margin-top: 0.9rem;">Verify Your E-mail Address</h3>
              </header>
  
              <p class="Reciever" style="font-size: 1.2em; font-weight: 500; text-align: center;">Hi, ${name}
              </p>
  
              <p class="myPara">You're almost ready to get started. Please click on the button</p>
              <p class="pnew">below to verify your email address and enjoy exclusive cleaning services with us!</p>
  
              <button class="btn">
                  <a class="hv" href="${verifyEmailURL}">Verify Your Email</a>
              </button>
  
              <div class="para-div">
                  <p style="font-weight: 549;">Thanks,</p>
                  <p style="margin-top: -0.2rem;">The Company Team</p>
              </div>
  
              <div class="bottom-div">
                  <h2>Get in touch</h2>
                  <h3>+91 9179213653</h3>
                  <p>info@SIHgov.com</p>
  
                  <div class="social-icons">
                       <img src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765719/facebook_z9jfrq.png">
                      <img src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765719/linkedin_volmbn.png">
                      <img src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765719/instagram_exrqpt.png">
                      <img src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765720/youtube_vwsi57.png">
                      <img src="https://res.cloudinary.com/dbnddgnke/image/upload/v1694765719/mail_2_wfbb0k.png">
                  </div>
              </div>
  
              <div class="foot">
                  <p>Copyrights &copy; SIHgovernment All Rights Reserved</p>
              </div>
          </div>
      </div>
  </body>
  </html>
   `
}
