import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Financial Advisor",
    content: "SmartCalc Hub has become an essential tool in my daily work. The mortgage and loan calculators save me hours of manual calculations.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Fitness Coach",
    content: "My clients love the BMI and calorie calculators. They're accurate, easy to use, and help me create better fitness plans.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Engineering Student",
    content: "The math and engineering calculators helped me through my entire degree. The step-by-step results are incredibly helpful for learning.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "Small Business Owner",
    content: "The profit margin and break-even calculators helped me understand my business finances better. Incredibly useful for planning.",
    rating: 5,
  },
  {
    name: "Amanda White",
    role: "Registered Nurse",
    content: "I use the body surface area and medication dose calculators daily. Fast, reliable, and exactly what healthcare professionals need.",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "Math Teacher",
    content: "Perfect for demonstrating calculations to students. The percentage and fraction calculators are now part of my teaching toolkit.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of professionals, students, and everyday users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
