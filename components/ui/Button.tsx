import { cn } from "@/lib/utils"

const variants = {
    "primary": "bg-neutral-100 text-neutral-900 dark:border-0 border border-neutral-300",
    "secondary": "dark:bg-[#3f3f46] dark:text-neutral-200 bg-neutral-100 text-neutral-900",
}

const Button = ({children, className, variant, icon, onClick}: {children: React.ReactNode, className?: string, variant: "primary" | "secondary", icon?: React.ReactNode, onClick?: () => void}) => {
  return (
    <button onClick={onClick} className={cn("px-3 py-1.5 flex gap-[4px] rounded-lg text-[14px] shadow-md items-center cursor-pointer hover:scale-[1.02] transition-all duration-100 ease-in", variants[variant], className)}>
        {icon}
        <div>
            {children}
        </div>
    </button>

  )
}
export default Button