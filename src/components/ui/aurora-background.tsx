 "use client";
 import { cn } from "@/lib/utils";
 import React from "react";
 
 interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
   children: React.ReactNode;
   showRadialGradient?: boolean;
 }
 
 export const AuroraBackground = ({
   className,
   children,
   showRadialGradient = true,
   ...props
 }: AuroraBackgroundProps) => {
   return (
     <section>
       <div
         className={cn(
           "relative flex flex-col h-full items-center justify-center bg-background text-foreground transition-bg",
           className
         )}
         {...props}
       >
         <div className="absolute inset-0 overflow-hidden">
           <div
             className={cn(
               `
              [--aurora:repeating-linear-gradient(100deg,hsl(212_89%_45%/0.15)_10%,hsl(212_89%_55%/0.1)_15%,hsl(212_89%_65%/0.07)_20%,hsl(212_89%_50%/0.08)_25%,hsl(212_89%_45%/0.12)_30%)]
              [background-image:var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter
              blur-[10px]
              after:content-[""]
              after:absolute
              after:inset-0
              after:[background-image:var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora
              after:[background-attachment:fixed]
              after:mix-blend-difference
              pointer-events-none
              absolute
              -inset-[10px]
              opacity-20
              will-change-transform`,
                showRadialGradient &&
                  `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
              )}
            />
          </div>
          <div className="absolute inset-0 bg-background/70 pointer-events-none" />
         {children}
       </div>
     </main>
   );
 };