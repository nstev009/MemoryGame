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
            Our team of two, Gregory House and Megatron Albus Cuddy, are passionate about game design and cognitive science.
            We believe in the power of games to enhance mental agility and provide a fun way to challenge
            yourself and others.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Have questions or feedback? Reach out to us at:
            <br />
            <a href="mailto:support@patternpulse.com">support@patternpulse.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
