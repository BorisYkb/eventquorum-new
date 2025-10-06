import Countdown from './Countdown'
import Layout from "../layout/Layout"
import Link from "next/link"
export default function RegistrationForm() {

  // Fonction pour défiler vers RegistrationForm
	const scrollToRegistration: () => void = () => {
		const el = document.getElementById('RegistrationForm');
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
  
  return (
    <>

      <Layout headerStyle={1} footerStyle={1}>
        <div>

          {/*===== CONTACT AREA STARTS =======*/}
          <div id="RegistrationForm" className="contact-inner-section sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="img1 image-anime">
                    <img src="/assets/landing-page/img/all-images/contact/contact-img4.png" alt="" />
                  </div>
                </div>
                <div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
                  <div className="contact4-boxarea">
                    <h3 className="text-anime-style-3">Demandez à vous inscrire ici</h3>
                    <div className="space10" />
                    <div className="row">
                      <div className="col-lg-12 col-md-6">
                        <div className="input-area">
                          <input type="text" placeholder="Nom" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="input-area">
                          <input type="text" placeholder="Prénom" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="input-area">
                          <input type="text" placeholder="Téléphone" />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-6">
                        <div className="input-area">
                          <input type="email" placeholder="Email" />
                        </div>
                      </div>
                      
                      <div className="col-lg-12">
                        <div className="space24" />
                        <div className="input-area text-end">
                          <button type="submit" className="vl-btn1">Envoyer ma demande</button>
                        </div>
                      </div>
                      <div className='col-lg-12 mt-3 text-center heading2'>
                        <p>Vous avez déjà un code d'accès ? <br /><Link href={'/connexion'}>Connecter vous</Link></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space100 d-lg-block d-none" />
          <div className="space50 d-lg-none d-block" />
          {/*===== CONTACT AREA ENDS =======*/}
          
          
        </div>

      </Layout>
    </>
  )
}