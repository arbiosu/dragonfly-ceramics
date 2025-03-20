import Link from "next/link"

interface BannerProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  variant?: "default" | "primary" | "secondary"
}

export default function Banner({
  title = "Welcome to our website",
  description = "Check out our latest features and updates",
  buttonText = "Learn More",
  buttonLink = "/features",
  variant = "default",
}: BannerProps) {
  // Define variant-specific styles
  const variantStyles = {
    default: "bg-df-text border-gray-200",
    primary: "bg-blue-600 text-white border-blue-500/20",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
  }

  const textStyles = {
    default: "text-white",
    primary: "text-white",
    secondary: "text-gray-800",
  }

  const buttonStyles = {
    default: "bg-dfNew2 hover:bg-dfNew hover:text-white text-df-text",
    primary: "bg-white hover:bg-gray-100 text-blue-600",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white",
  }

  return (
    <div className={`md:mx-40 py-6 px-4 md:px-6 lg:px-8 border-b ${variantStyles[variant]}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 text-center md:text-left">
          <h2 className={`text-2xl ${textStyles[variant]}`}>{title}</h2>
          <p className={`text-sm md:text-base opacity-90 max-w-md ${textStyles[variant]}`}>{description}</p>
        </div>
        <div>
          <Link href={buttonLink}>
            <span
              className={`inline-flex px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyles[variant]}`}
            >
              {buttonText}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

