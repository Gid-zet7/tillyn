import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tillyn | Accessibility Statement - Commitment to Inclusivity`,
  description: `Read Tillyn's Accessibility Statement to learn about our commitment to inclusivity and accessibility. Discover how we ensure our website is accessible to all users, including those with disabilities.`,
};

const AccessibilityStatement = () => {
  return (
    <>
      <div
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
        className="text-sm"
      >
        <h1 className="text-2xl font-bold">Accessibility Statement</h1>
        <p className="my-6 text-sm">
          <strong>
            Last updated: <em>27th September, 2024</em>
          </strong>
        </p>

        <section>
          <h2 className="font-bold my-2">1. Introduction</h2>
          <p>
            At Tillyn, we are dedicated to creating an inclusive online
            experience for all users, including those with disabilities. We
            strive to ensure that our website is accessible, user-friendly, and
            compliant with global accessibility standards. Our goal is to
            provide equal access to information and services for everyone.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">2. Accessibility Standards</h2>
          <p>
            Tillyn is committed to adhering to the Web Content Accessibility
            Guidelines (WCAG) 2.1, Level AA standards. These guidelines help
            make web content more accessible to individuals with disabilities
            and more usable for all users. We continuously monitor and improve
            our website to meet these standards.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">3. Accessibility Features</h2>
          <p>
            To ensure an accessible experience, we have implemented the
            following features:
          </p>
          <ul>
            <li>
              <strong>Text Alternatives:</strong> All non-text content, such as
              images, includes descriptive text alternatives for screen reader
              users.
            </li>
            <li>
              <strong>Keyboard Navigation:</strong> Our website is fully
              navigable using a keyboard, ensuring accessibility for users who
              cannot use a mouse.
            </li>
            <li>
              <strong>Readable Text:</strong> We maintain high contrast between
              text and background colors and ensure text is resizable without
              loss of functionality.
            </li>
            <li>
              <strong>Responsive Design:</strong> Our website is optimized for
              all devices, including desktops, tablets, and mobile phones,
              ensuring a seamless experience across screen sizes.
            </li>
            <li>
              <strong>Form Accessibility:</strong> All forms include clear
              labels and are designed to be accessible to screen readers and
              keyboard users.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold my-2">4. Ongoing Accessibility Efforts</h2>
          <p>
            Accessibility is an ongoing priority at Tillyn. Our efforts include:
          </p>
          <ul>
            <li>
              Conducting regular accessibility audits using assistive
              technologies.
            </li>
            <li>
              Providing training for our team on accessibility best practices.
            </li>
            <li>
              Actively seeking and incorporating user feedback to improve
              accessibility.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold my-2">
            5. Feedback and Contact Information
          </h2>
          <p>
            Your feedback is invaluable in helping us improve accessibility. If
            you encounter any issues or have suggestions, please reach out to
            us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> tillynclothings@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +233 0500303230
            </li>
            <li>
              <strong>Address:</strong> Gz-043-2515
            </li>
          </ul>
          <p>
            We aim to respond to all accessibility-related inquiries within{" "}
            <strong>5 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">6. Our Commitment</h2>
          <p>
            Tillyn is committed to maintaining and improving the accessibility
            of our website. We view accessibility as an essential part of our
            mission to provide an inclusive and equitable experience for all
            users. We will continue to invest in resources and technologies to
            ensure our website meets the highest accessibility standards.
          </p>
        </section>
      </div>
    </>
  );
};

export default AccessibilityStatement;
