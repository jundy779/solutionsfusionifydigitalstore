import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: LucideIcon;
  /** Uses a pulsing dot instead of icon. Defaults to primary color. */
  badgeDot?: boolean;
  badgeVariant?: "primary" | "destructive";
  title: string;
  titleHighlight?: string;
  /** Text before the highlight (if title and highlight are separate) */
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  maxSubtitleWidth?: string;
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
  maxSubtitleWidth = "xl",
}: SectionHeaderProps) => {
  const isDestructive = badgeVariant === "destructive";
  const alignClass = align === "center" ? "text-center" : "text-left";
  const subtitleMaxW = align === "center"
    ? `max-w-${maxSubtitleWidth} mx-auto`
    : `max-w-${maxSubtitleWidth}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`${alignClass} ${align === "center" ? "mb-14" : "mb-0"} ${className}`}
    >
      {/* Badge */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 ${
          isDestructive
            ? "border-destructive/20 bg-destructive/5"
            : "border-primary/20 bg-primary/5"
        }`}
      >
        {BadgeIcon ? (
          <BadgeIcon className={`w-4 h-4 ${isDestructive ? "text-destructive" : "text-primary"}`} />
        ) : badgeDot ? (
          <span
            className={`w-2 h-2 rounded-full ${
              isDestructive ? "bg-destructive animate-pulse" : "bg-primary"
            }`}
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
        )}
        <span
          className={`text-sm font-medium ${
            isDestructive ? "text-destructive/80" : "text-muted-foreground"
          }`}
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
        <p className={`text-muted-foreground ${subtitleMaxW} text-base md:text-lg leading-relaxed`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
