import { CheckCircle2 } from "lucide-react";

const features = [
  "Tim profesional dan berpengalaman",
  "Teknologi terkini dan best practices",
  "Support responsif untuk klien",
  "Harga kompetitif dan transparan",
];

export const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center content-width-lg">
          {/* Left Column - Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
                <div className="aspect-[4/3] rounded-xl bg-primary flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary-foreground">F</span>
                    </div>
                    <h3 className="font-bold text-xl text-primary-foreground mb-1">
                      FUSIONIFY
                    </h3>
                    <p className="text-primary-foreground/80 text-sm">
                      Digital Solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-4 -right-4 bg-card rounded-xl border border-border p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">5+</span>
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">Years</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="font-bold text-3xl md:text-4xl mb-5 text-foreground leading-tight">
              Partner Terpercaya untuk Transformasi Digital
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Fusionify Digital Solutions adalah tim profesional yang berfokus 
              pada penyediaan solusi digital inovatif. Kami berkomitmen untuk 
              membantu bisnis Anda mencapai potensi maksimal di era digital.
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
