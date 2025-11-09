import { Layout } from "@/components/Layout";
import { SEOHead } from "@/components/SEOHead";

const Terms = () => {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service | SmartCalc Hub"
        description="Read the terms of service for using SmartCalc Hub calculators and services."
        canonicalUrl="https://smartcalchub.com/terms"
      />
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">Last updated: November 9, 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using SmartCalc Hub, you accept and agree to be bound by the terms and 
            provisions of this agreement.
          </p>

          <h2>Use of Service</h2>
          <p>
            SmartCalc Hub provides free online calculators for educational and informational purposes. 
            You may use our calculators for personal or commercial purposes.
          </p>

          <h2>Accuracy of Calculations</h2>
          <p>
            While we strive to provide accurate calculators using industry-standard formulas, we cannot 
            guarantee 100% accuracy. Users should verify critical calculations independently.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            SmartCalc Hub is provided "as is" without warranties of any kind, either express or implied. 
            We do not warrant that our calculators will meet your requirements or be error-free.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            SmartCalc Hub shall not be liable for any damages arising from the use or inability to use 
            our calculators, including but not limited to financial losses.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on SmartCalc Hub, including calculator algorithms, designs, and text, is owned 
            by SmartCalc Hub or its licensors and is protected by copyright laws.
          </p>

          <h2>User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use our service for any illegal purpose</li>
            <li>Attempt to interfere with our service's proper functioning</li>
            <li>Reverse engineer or copy our calculators</li>
            <li>Use automated tools to access our service excessively</li>
          </ul>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of SmartCalc Hub 
            constitutes acceptance of modified terms.
          </p>

          <h2>Contact Information</h2>
          <p>
            For questions about these Terms of Service, contact us at{" "}
            <a href="mailto:ma7122671@gmail.com">ma7122671@gmail.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
