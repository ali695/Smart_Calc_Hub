import { getCalculatorSEOContent } from "@/data/calculatorSEOContent";
import { Card } from "@/components/ui/card";

interface CalculatorSEOContentProps {
  calculatorSlug: string;
}

/**
 * Renders unique SEO-optimized content for each calculator.
 * Content is static HTML, pre-rendered at build time for SSG compatibility.
 */
export const CalculatorSEOContent = ({ calculatorSlug }: CalculatorSEOContentProps) => {
  const content = getCalculatorSEOContent(calculatorSlug);
  
  if (!content) {
    return null;
  }

  return (
    <Card className="p-6 md:p-8">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">
          About the {content.primaryKeyword}
        </h2>
        
        <section className="mb-6">
          <p className="text-muted-foreground leading-relaxed">
            {content.introduction}
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-3">How This Calculator Works</h3>
          <p className="text-muted-foreground leading-relaxed">
            {content.howItWorks}
          </p>
        </section>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Practical Use Cases</h3>
          <p className="text-muted-foreground leading-relaxed">
            {content.useCases}
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">Tips for Best Results</h3>
          <p className="text-muted-foreground leading-relaxed">
            {content.tips}
          </p>
        </section>
      </article>
    </Card>
  );
};
