import React from "react";
import { faFacebookF, faTwitter, faGooglePlusG,faLinkedinIn, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faHome,faEnvelope,faPhone} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

function Footer(props) {

    const headerStyle = {

        backgroundColor: "#21d192"

    }

    const contentStyle = {
        width: "60px"
    }


    return (




        <div>
            <footer class="page-footer font-small blue-grey lighten-5">
                {/* <div style="background-color: #21d192;"> */}
                <div style={headerStyle}>
                    <div class="container">


                        <div class="row py-4 d-flex align-items-center">

                            <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                                <h6 class="mb-0">Get connected with us on social networks!</h6>
                            </div>


                            <div class="col-md-6 col-lg-7 text-center text-md-right">

                                <a class="fb-ic">
                                    {/* <i class="fab fa-facebook-f white-text mr-4"> </i> */}
                                    <FontAwesomeIcon cursor="pointer" icon={faFacebookF} 
                                        className=" white-text mr-4" />
                                </a>
                                <a class="tw-ic">
                                    {/* <i class="fab fa-twitter white-text mr-4"> </i> */}
                                    <FontAwesomeIcon cursor="pointer" icon={faTwitter} 
                                        className=" white-text mr-4" />
                                </a>

                                <a class="gplus-ic">
                                    {/* <i class="fab fa-google-plus-g white-text mr-4"> </i> */}
                                    <FontAwesomeIcon cursor="pointer" icon={faGooglePlusG} 
                                        className=" white-text mr-4" />
                                </a>

                                <a class="li-ic">
                                    {/* <i class="fab fa-linkedin-in white-text mr-4"> </i> */}
                                    <FontAwesomeIcon cursor="pointer" icon={faLinkedinIn} 
                                        className=" white-text mr-4" />
                                </a>

                                <a class="ins-ic">
                                    {/* <i class="fab fa-instagram white-text"> </i> */}
                                    <FontAwesomeIcon cursor="pointer" icon={faInstagram} 
                                        className=" white-text mr-4" />
                                </a>

                            </div>


                        </div>


                    </div>
                </div>

                <div class="container text-center text-md-left mt-5">


                    <div class="row mt-3 dark-grey-text">


                        <div class="col-md-3 col-lg-4 col-xl-3 mb-4">


                            <h6 class="text-uppercase font-weight-bold">Company name</h6>
                            {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                            <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={contentStyle} />
                            <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                              consectetur
          adipisicing elit.</p>

                        </div>



                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">


                            <h6 class="text-uppercase font-weight-bold">Members</h6>
                            {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                            <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={contentStyle} />
                            <p>
                                <a class="dark-grey-text" href="#!">Harish</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Allan</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Gabby</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Shuangwei Shi </a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Amel</a>
                            </p>

                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">


                            <h6 class="text-uppercase font-weight-bold">PS Number</h6>
                            {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                            <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={contentStyle} />
                            <p>
                                <a class="dark-grey-text" href="#!">10441759</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Become an Affiliate</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Shipping Rates</a>
                            </p>
                            <p>
                                <a class="dark-grey-text" href="#!">Help</a>
                            </p>

                        </div>

                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                            <h6 class="text-uppercase font-weight-bold">Contact</h6>
                            {/* <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;" /> */}
                            <hr class="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" style={contentStyle} />
                            <p>
                                {/* <i class="fas fa-home mr-3"></i> 1 Castle Point Terrace, Hoboken, NJ 07030</p> */}
                                <FontAwesomeIcon cursor="pointer" icon={faHome} 
                                        className=" white-text mr-3" />
                                1 Castle Point Terrace, Hoboken, NJ 07030</p>
                            <p>
                                {/* <i class="fas fa-envelope mr-3"></i> */}
                                <FontAwesomeIcon cursor="pointer" icon={faEnvelope} 
                                        className=" white-text mr-3" />
                                 info@stevens.com</p>
                            <p>
                                {/* <i class="fas fa-phone mr-3"></i> */}
                                <FontAwesomeIcon cursor="pointer" icon={faPhone} 
                                        className=" white-text mr-3" />
                                 + 01 (201) 216-5000</p>
                            

                        </div>


                    </div>


                </div>

                <div class="footer-copyright text-center text-black-50 py-3">© 2018 Copyright:
    <a class="dark-grey-text" href="https://mdbootstrap.com/education/bootstrap/"> MDBootstrap.com</a>
                </div>

            </footer>

        </div>












    )

}

export default Footer;