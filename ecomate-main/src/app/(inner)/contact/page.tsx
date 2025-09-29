import HeaderOne from "@/components/header/HeaderOne";
import ShortService from "@/components/service/ShortService";
import FooterOne from "@/components/footer/FooterOne";

export default function Home() {
    return (
        <div className="demo-one">
            <HeaderOne />

            <>
                {/* rts contact main wrapper */}
                <div className="rts-contact-main-wrapper-banner bg_image">
                    <div className="container">
                        <div className="row">
                            <div className="co-lg-12">
                                <div className="contact-banner-content">
                                    <h1 className="title">Ask Us Question</h1>
                                    <p className="disc">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                                        pretium mollis ex, vel interdum augue faucibus sit amet. Proin
                                        tempor purus ac suscipit...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts contact main wrapper end */}

                <div className="rts-map-contact-area rts-section-gap2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="contact-left-area-main-wrapper">
                                    <h2 className="title">You can ask us questions !</h2>
                                    <p className="disc">
                                        Contact us for all your questions and opinions, or you can solve
                                        your problems in a shorter time with our contact offices.
                                    </p>
                                    <div className="location-single-card">
                                        <div className="icon">
                                            <i className="fa-light fa-location-dot" />
                                        </div>
                                        <div className="information">
                                            <h3 className="title">Berlin Germany Store</h3>
                                            <p>259 Daniel Road, FKT 2589 Berlin, Germany.</p>
                                            <a href="#" className="number">
                                                +856 (76) 259 6328
                                            </a>
                                            <a href="#" className="email">
                                                info@example.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="location-single-card">
                                        <div className="icon">
                                            <i className="fa-light fa-location-dot" />
                                        </div>
                                        <div className="information">
                                            <h3 className="title">Frankfurt Germany Store</h3>
                                            <p>259 Daniel Road, FKT 2589 Berlin, Germany.</p>
                                            <a href="#" className="number">
                                                +856 (76) 259 6328
                                            </a>
                                            <a href="#" className="email">
                                                info@example.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 pl--50 pl_sm--5 pl_md--5">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.288851207937!2d90.47855065!3d23.798243149999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1716725338558!5m2!1sen!2sbd"
                                    width={600}
                                    height={540}
                                    style={{ border: 0 }}
                                    allowFullScreen={true} // Fixed here: Set to true or omitted if not needed
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts contact-form area start */}
                <div className="rts-contact-form-area rts-section-gapBottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bg_light-1 contact-form-wrapper-bg">
                                    <div className="row">
                                        <div className="col-lg-7 pr--30 pr_md--10 pr_sm--5">
                                            <div className="contact-form-wrapper-1">
                                                <h3 className="title mb--50">
                                                    Fill Up The Form If You Have Any Question
                                                </h3>
                                                <form action="#" className="contact-form-1">
                                                    <div className="contact-form-wrapper--half-area">
                                                        <div className="single">
                                                            <input type="text" placeholder="name*" />
                                                        </div>
                                                        <div className="single">
                                                            <input type="text" placeholder="Email*" />
                                                        </div>
                                                    </div>
                                                    <div className="single-select">
                                                        <select>
                                                            <option data-display="Subject*">All Categories</option>
                                                            <option value={1}>Some option</option>
                                                            <option value={2}>Another option</option>
                                                            <option value={3}>Potato</option>
                                                        </select>
                                                    </div>
                                                    <textarea
                                                        name="message"
                                                        placeholder="Write Message Here"
                                                        defaultValue={""}
                                                    />
                                                    <button className="rts-btn btn-primary mt--20">
                                                        Send Message
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 mt_md--30 mt_sm--30">
                                            <div className="thumbnail-area">
                                                <img src="assets/images/contact/02.jpg" alt="contact_form" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* rts contact-form area end */}
            </>

            <ShortService />
            <FooterOne />
        </div>
    );
}
