import React, { useRef } from 'react';
import { Header, Footer } from 'components';
import { Row, Col } from 'react-bootstrap';
import { useScrollIntoView } from 'hooks';
import aboutImg from './about.jpg';

export const Home = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  useScrollIntoView({
    intro: introRef,
    features: featuresRef,
    about: aboutRef,
    services: servicesRef,
  })

  return (
    <>
      <Header />
      <div className="home-page">
        <div className="intro" ref={introRef}>
          <div className="overlay">
            <div className="row">
              <div className="col-md-10 col-md-offset-2 intro-text ml-sm-5">
                <h1>Your Plants Are Safe Now</h1>
              </div>
            </div>
          </div>
        </div>
        <section ref={featuresRef} className="features text-center section-dark">
          <div className="container-body">
            <div className="section-title mb-3">
              <h2>Features</h2>
              <p>
                All you need for your plant is your concern. We remind you that
                your plant needs your attention.
              </p>
            </div>
            <Row>
              <Col>
                <h3>ADD</h3>
                <p>plants and schedule watering</p>
              </Col>
              <Col>
                <h3>TRACK</h3>
                <p>when to water</p>
              </Col>
              <Col>
                <h3>SAFE</h3>
                <p>your plants from dying</p>
              </Col>
            </Row>
          </div>
        </section>
        <section ref={aboutRef} className="about">
          <div className="row">
            <div className="col-xs-12 col-md-6 about-image">
              <img src={aboutImg} className="img-responsive" alt="" />
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <p>
                  We are plants lovers. And we want to help you take care of your
                  home plants.
                </p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      <li>Simple UI</li>
                      <li>Care to every client</li>
                      <li>It is free</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={servicesRef} className="services text-center section-dark">
          <div className="container-body">
            <div className="section-title">
              <h2>Our Services</h2>
              <h3>We offer to you</h3>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>List of plants</h3>
                  <p>Add as mach as you want</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>Plant Passport</h3>
                  <p>Add name, photo, description to your plant profile</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>Gallery</h3>
                  <p>Add images of your plant and see how it grows</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>Reminders</h3>
                  <p>Schedule reminders for each plant separately</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>Notification</h3>
                  <p>
                    Receive notification when it&apos;s time to water your plant
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-desc">
                  <h3>Statistic</h3>
                  <p>Get detailed stats about your plants life</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="join-us sign-up section-featured text-center">
          <div className="section-title mb-3">
            <h2>Join Us</h2>
          </div>
          <a href="/signup" className="btn btn-primary btn-lg signup-button">
            Sign Up
          </a>
          <p className="mb-0">It is free :)</p>
        </section>
      </div>
      <Footer />
    </>
  );
 }
