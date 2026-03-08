import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: LucideIcon;
  badgeDot?: boolean;
  badgeVariant?: "primary" | "destructive";
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  subtitleClassName?: string;
}

export const SectionHeader = ({
  badge,
  badgeIcon: BadgeIcon,
  badgeDot = false,
  badgeVariant = "primary",
  title,
  titleHighlight,
  subtitle,
  align = "center",
  className = "",
  subtitleClassName = "max-w-xl",
}: SectionHeaderProps) => {
  const isDestructive = badgeVariant === "destructive";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        align === "center" ? "text-center mb-14" : "text-left",
        className,
      )}
    >
      {/* Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6",
          isDestructive
            ? "border-destructive/20 bg-destructive/5"
            : "border-primary/20 bg-primary/5",
        )}
      >
        {BadgeIcon ? (
          <BadgeIcon className={cn("w-4 h-4", isDestructive ? "text-destructive" : "text-primary")} />
        ) : badgeDot ? (
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              isDestructive ? "bg-destructive animate-pulse" : "bg-primary",
            )}
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        )}
        <span
          className={cn(
            "text-sm font-medium",
            isDestructive ? "text-destructive/80" : "text-muted-foreground",
          )}
        >
          {badge}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-5 text-foreground">
        {title}
        {titleHighlight && <span className="text-gradient">{titleHighlight}</span>}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={cn(
          "text-muted-foreground text-base md:text-lg leading-relaxed",
          align === "center" && "mx-auto",
          subtitleClassName,
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};