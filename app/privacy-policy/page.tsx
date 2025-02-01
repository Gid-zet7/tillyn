import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tillyn | Privacy Policy - Your Data, Your Rights`,
  description: `Read Tillyn's Privacy Policy to understand how we collect, use, and protect your personal information. Learn about your rights and how we ensure your data is secure.`,
};

const PrivacyPolicy = () => {
  return (
    <>
      <div
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
        className="text-sm"
      >
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p className="my-6 text-sm">
          <strong>
            Last updated: <em>27th September, 2024</em>
          </strong>
        </p>
        <p>
          At Tillyn.store, we are committed to protecting your privacy and
          ensuring the security of your personal information. This Privacy
          Policy explains how we collect, use, share, and safeguard your data
          when you visit our website, tillyn.store, or interact with our
          services. By using our platform, you agree to the practices described
          in this policy.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          1. Information We Collect
        </h2>
        <p>
          We collect various types of information to provide and improve our
          services:
        </p>
        <ul className="list-disc">
          <li>
            <strong>Personal Information</strong>: Name, email address, phone
            number, and delivery address provided during account creation or
            checkout.
          </li>
          <li>
            <strong>Account Information</strong>: Username, password, purchase
            history, and preferences.
          </li>
          <li>
            <strong>Browsing Information</strong>: IP address, browser type,
            operating system, referral URLs, and other technical data collected
            through cookies and analytics tools.
          </li>
          <li>
            <strong>Cookies and Tracking</strong>: We use cookies to enhance
            your browsing experience, remember preferences, and analyze website
            traffic.
          </li>
        </ul>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          2. How We Use Your Information
        </h2>
        <p>Your information is used for the following purposes:</p>
        <ul className="list-disc">
          <li>
            <strong>Service Delivery</strong>: To process orders, handle
            transactions, and provide customer support.
          </li>
          <li>
            <strong>Website Improvement</strong>: To analyze user behavior and
            enhance our website’s functionality and user experience.
          </li>
          <li>
            <strong>Communication</strong>: To send order confirmations,
            updates, newsletters, and promotional offers. You can opt out of
            marketing communications at any time.
          </li>
          <li>
            <strong>Security</strong>: To monitor and prevent fraudulent
            activities and unauthorized access.
          </li>
        </ul>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          3. How We Share Your Information
        </h2>
        <p>
          We do not sell your personal information. However, we may share it
          with:
        </p>
        <ul className="list-disc">
          <li>
            <strong>Service Providers</strong>: Third-party vendors who assist
            with delivery, payment processing, and analytics.
          </li>
          <li>
            <strong>Legal Compliance</strong>: When required by law or in
            response to legal requests.
          </li>
          <li>
            <strong>Business Transfers</strong>: In the event of a merger,
            acquisition, or sale of assets, your data may be transferred as part
            of the transaction.
          </li>
        </ul>

        <h2 className="mt-6 mb-2 font-semibold text-xl">4. Data Security</h2>
        <p>
          We implement industry-standard security measures, including encryption
          and secure data storage, to protect your information. However, no
          online platform can guarantee absolute security, and we encourage you
          to take steps to protect your personal data.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          5. Your Rights and Choices
        </h2>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc">
          <li>
            <strong>Access and Update</strong>: You can review and update your
            account information at any time.
          </li>
          <li>
            <strong>Data Deletion</strong>: You may request the deletion of your
            data, subject to legal and business requirements.
          </li>
          <li>
            <strong>Marketing Preferences</strong>: You can opt out of
            promotional emails by following the unsubscribe link in the email or
            adjusting your account settings.
          </li>
          <li>
            <strong>Cookie Management</strong>: You can control cookies through
            your browser settings, though disabling them may affect website
            functionality.
          </li>
        </ul>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          6. Third-Party Links
        </h2>
        <p>
          Our website may contain links to third-party sites. We are not
          responsible for their privacy practices, and we encourage you to
          review their privacy policies before providing any personal
          information.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          7. Children&apos;s Privacy
        </h2>
        <p>
          Our services are not intended for children under 13. We do not
          knowingly collect personal information from children. If we become
          aware of such data, we will take steps to delete it.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          8. International Users
        </h2>
        <p>
          If you are accessing our website from outside Ghana, your data may be
          transferred to and processed in Ghana. By using our services, you
          consent to this transfer and processing.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy periodically. The revised version
          will be posted on this page with an updated "Effective Date." We
          encourage you to review this policy regularly.
        </p>

        <h2 className="mt-6 mb-2 font-semibold text-xl">10. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please
          contact us at:
        </p>
        <ul>
          <li>
            <strong>Email</strong>: tillynclothings@gmail.com
          </li>
          <li>
            <strong>Phone</strong>: +233 0500303230
          </li>
          <li>
            <strong>Address</strong>: Gz-043-2515
          </li>
        </ul>
      </div>
    </>
  );
};

export default PrivacyPolicy;
