import Link from 'next/link';

interface BannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'default' | 'primary' | 'secondary';
}

export default function Banner({
  title = 'Welcome to our website',
  description = 'Check out our latest features and updates',
  buttonText = 'Learn More',
  buttonLink = '/features',
  variant = 'default',
}: BannerProps) {
  // Define variant-specific styles
  const variantStyles = {
    default: 'bg-df-text border-gray-200',
    primary: 'bg-blue-600 text-white border-blue-500/20',
    secondary: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const textStyles = {
    default: 'text-white',
    primary: 'text-white',
    secondary: 'text-gray-800',
  };

  const buttonStyles = {
    default: 'bg-dfNew2 hover:bg-dfNew hover:text-white text-df-text',
    primary: 'bg-white hover:bg-gray-100 text-blue-600',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white',
  };

  return (
    <div
      className={`border-b px-4 py-6 md:mx-40 md:px-6 lg:px-8 ${variantStyles[variant]}`}
    >
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div className='space-y-2 text-center md:text-left'>
          <h2 className={`text-2xl ${textStyles[variant]}`}>{title}</h2>
          <p
            className={`max-w-md text-sm opacity-90 md:text-base ${textStyles[variant]}`}
          >
            {description}
          </p>
        </div>
        <div>
          <Link href={buttonLink}>
            <span
              className={`inline-flex rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonStyles[variant]}`}
            >
              {buttonText}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
