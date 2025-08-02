import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function MediatorsListDemo () {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/profile/pic.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/profile/profile.jpg",
    },
    
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
