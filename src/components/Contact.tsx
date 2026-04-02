export default function Contact() {
  return (
    <section id="contact" className="section-container text-center">
      <div className="section-label justify-center">Contact</div>
      <h2 className="contact-heading">
        Let's build <em>something</em>.
      </h2>
      <p className="text-base leading-relaxed text-secondary max-w-lg mx-auto mb-10">
        Available for internships, developer roles, freelance collaboration, and cloud-focused
        product work.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a href="mailto:kzyrellyan@gmail.com" className="contact-link">Email</a>
        <a href="https://github.com/kyeldlpz" target="_blank" rel="noreferrer" className="contact-link">GitHub</a>
        <a href="https://www.linkedin.com/in/kzyrell-dela-paz-b04395351/" target="_blank" rel="noreferrer" className="contact-link">LinkedIn</a>
      </div>
    </section>
  );
}
