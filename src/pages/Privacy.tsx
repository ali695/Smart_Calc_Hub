import { SEOHead } from "@/components/SEOHead";
import { PageHeader } from "@/components/PageHeader";

const Privacy = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | SmartCalc Hub"
        description="Learn how SmartCalc Hub protects your privacy. We don't store your calculation data and respect your privacy."
        canonicalUrl="https://smartcalhub.online/privacy"
      />
      
      <PageHeader 
        title="Privacy Policy"
        description="Last updated: November 9, 2025"
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h2>Introduction</h2>
          <p>
            At SmartCalc Hub, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your information when you use our calculator services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            SmartCalc Hub is designed with privacy in mind. We do not collect or store any calculation 
            inputs you enter into our calculators. All calculations are performed locally in your browser.
          </p>
          <p>We may collect:</p>
          <ul>
            <li>Basic analytics data (page views, device type) to improve our services</li>
            <li>Information you voluntarily provide through contact forms</li>
            <li>Cookies for essential website functionality</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>Any information we collect is used to:</p>
          <ul>
            <li>Improve and optimize our calculator services</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Analyze usage patterns to enhance user experience</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information. Since we don't store 
            calculation data, there's minimal risk to your personal information.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services like Google Analytics to understand how visitors use our site. 
            These services have their own privacy policies.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access any personal information we may have</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of analytics tracking</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:ma7122671@gmail.com">ma7122671@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;
