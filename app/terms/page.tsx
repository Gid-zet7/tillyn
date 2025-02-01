import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tillyn | Terms and Conditions - Your Guide to Using Our Services`,
  description: `Review Tillyn's Terms and Conditions to understand the rules and guidelines for using our website and services. Learn about payments, deliveries, returns, and more.`,
};

const TermsAndConditions = () => {
  return (
    <>
      <div
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
        className="text-sm"
      >
        <h1 className="text-2xl font-bold">Terms and Conditions</h1>
        <p className="my-6 text-sm">
          <strong>
            Last updated: <em>27th September, 2024</em>
          </strong>
        </p>

        <section>
          <h2 className="font-bold my-2">1. Introduction</h2>
          <p>
            Welcome to <strong>Tillyn.com</strong>. By accessing or using our
            website and services, you agree to comply with and be bound by the
            following terms and conditions. These terms govern your use of our
            platform, including browsing, purchasing, and interacting with our
            services. Please read them carefully before proceeding.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">2. General Conditions</h2>
          <ul className="list-disc">
            <li>
              We reserve the right to refuse service to anyone for any reason at
              any time.
            </li>
            <li>
              Prices for our products are subject to change without prior
              notice.
            </li>
            <li>
              We may modify, suspend, or discontinue any service or feature
              without notice at any time.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold my-2">3. Products and Services</h2>
          <ul className="list-disc">
            <li>
              <strong>Product Accuracy</strong>: We strive to ensure that
              product descriptions, images, and pricing are accurate. However,
              we do not guarantee that every detail will be error-free.
            </li>
            <li>
              <strong>Product Quality</strong>: All items are sold "as is."
              While we ensure high-quality standards, we cannot guarantee that
              every product will meet your subjective expectations.
            </li>
            <li>
              <strong>Quantity Limits</strong>: We reserve the right to limit
              the quantities of any product or service offered.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold my-2">4. Payment</h2>
          <p>
            Payment must be made in full at the time of purchase. All prices are
            listed in <strong>Ghanaian Cedis (GH₵)</strong> and include
            applicable taxes. We accept various payment methods, including
            mobile money and credit/debit cards.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">5. Delivery</h2>
          <p>
            Delivery times may vary depending on your location. Delivery costs
            are calculated at checkout and are non-refundable. While we strive
            to deliver on time, we are not responsible for delays caused by
            third-party courier services or unforeseen circumstances.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">6. Returns and Exchanges</h2>
          <p>
            Due to the nature of our business, all sales are final, and we do
            not accept returns or exchanges. However, if you receive a defective
            item, please contact us within <strong>7 days</strong> of receipt to
            discuss possible solutions.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">7. Privacy Policy</h2>
          <p>
            Your privacy is important to us. We collect and use your personal
            information to process orders and improve your shopping experience.
            For more details, please review our{" "}
            <a className="text-blue-300 hover:underline" href="/privacy-policy">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">8. Limitation of Liability</h2>
          <p>
            <strong>Tillyn</strong> shall not be liable for any direct,
            indirect, incidental, or consequential damages arising from your use
            of our website or products. While we strive to provide uninterrupted
            and error-free services, we do not guarantee that our platform will
            always be available or free from issues.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">9. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of <strong>Ghana</strong>. Any disputes
            arising from or relating to these terms shall be subject to the
            exclusive jurisdiction of the courts of Ghana.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">
            10. Changes to Terms and Conditions
          </h2>
          <p>
            We reserve the right to update or modify these terms and conditions
            at any time without prior notice. Your continued use of our website
            after any changes constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-bold my-2">11. Contact Information</h2>
          <p>
            If you have any questions or concerns about these terms and
            conditions, please contact us at:
          </p>
          <ul className="list-disc">
            <li>
              <strong>Email</strong>: tillynclothings@gmail.com
            </li>
            <li>
              <strong>Phone</strong>: +233 0500303230 / +233 0546455953
            </li>
            <li>
              <strong>Address</strong>: Gz-043-2515
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
