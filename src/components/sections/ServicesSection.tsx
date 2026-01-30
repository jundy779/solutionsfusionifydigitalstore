import { 
  Code2, 
  Bot, 
  Settings2, 
  Cloud, 
  Briefcase 
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web & App Development",
    description: "Custom websites and mobile applications built with modern frameworks. From landing pages to complex platforms.",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Intelligent Telegram and WhatsApp bots to automate customer service, notifications, and workflows.",
  },
  {
    icon: Settings2,
    title: "Digital Systems & Integrations",
    description: "Seamless integration of APIs, payment gateways, CRMs, and internal tools for unified operations.",
  },
  {
    icon: Cloud,
    title: "Cloud & IT Support",
    description: "Cloud infrastructure setup, maintenance, and IT support with reliable hosting and monitoring.",
  },
  {
    icon: Briefcase,
    title: "Project-based Services",
    description: "Flexible engagement for specific projects. From MVP development to system audits.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-bold text-3xl md:text-4xl mb-4 text-foreground">
            Layanan Digital Lengkap
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Kami menyediakan berbagai layanan digital untuk membantu bisnis Anda 
            tumbuh dan berkembang di era digital.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 content-width-lg">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-200">
                <service.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
