import './aboutus.css';

function AboutUs() {
  return (
    <div className="page-content">
      <h1>About Pattern Pulse</h1>
      <div className="about-container">
        <section>
          <h2>Our Mission</h2>
          <p>
            Pattern Pulse was created to help people improve their memory and pattern 
            recognition skills through engaging gameplay.
          </p>
        </section>
        <section>
          <h2>The Team</h2>
          <p>
            Our team of developers and designers are passionate about creating 
            educational games that are both fun and beneficial for cognitive development.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Have questions or feedback? Reach out to us at:
            <br />
            <a href="mailto:contact@patternpulse.com">contact@patternpulse.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
