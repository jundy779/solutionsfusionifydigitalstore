import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface ServiceBreadcrumbProps {
  currentService: string;
}

export const ServiceBreadcrumb = ({ currentService }: ServiceBreadcrumbProps) => {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
      <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="w-3 h-3" />
        <span>Beranda</span>
      </Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <Link to="/#services" className="hover:text-foreground transition-colors">
        Layanan
      </Link>
      <ChevronRight className="w-3 h-3 flex-shrink-0" />
      <span className="text-foreground font-medium">{currentService}</span>
    </nav>
  );
};
