import { Link } from 'react-router-dom'
import { Layers, Zap, Lock, Code, Server, Coins } from 'lucide-react'

// Custom Button component
const Button = ({ children, className, variant, ...props }) => (
  <button
    className={`px-6 py-3 rounded-md font-medium text-lg ${
      variant === 'outline'
        ? 'border-2 border-[#d4c8b8] text-black hover:bg-[#d4c8b8]/10'
        : 'bg-[#d4c8b8] text-black hover:bg-[#c4b8a8]'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
)

// Custom Input component
const Input = ({ className, ...props }) => (
  <input
    className={`px-4 py-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4c8b8] text-lg ${className}`}
    {...props}
  />
)

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="px-6 lg:px-12 h-20 flex items-center border-b">
        <Link className="flex items-center justify-center" to="/">
          <Layers className="h-8 w-8 text-[#d4c8b8]" />
          <span className="ml-2 text-2xl font-bold">Hermes</span>
        </Link>
        <nav className="ml-auto flex gap-8">
          <Link className="text-lg font-medium hover:text-[#d4c8b8]" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-lg font-medium hover:text-[#d4c8b8]" to="#pricing">
            Pricing
          </Link>
          <Link className="text-lg font-medium hover:text-[#d4c8b8]" to="/login">
            Login
          </Link>
          <Link className="text-lg font-medium hover:text-[#d4c8b8]" to="/signup">
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-28 lg:py-40 xl:py-48">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Bitcoin Layer 2 Node Infrastructure
                </h1>
                <p className="mx-auto max-w-[800px] text-xl text-gray-600 md:text-2xl">
                  Supercharge your Bitcoin Layer 2 applications with our high-performance, scalable node infrastructure.
                </p>
              </div>
              <div className="space-x-6">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <Zap className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">High Performance</h3>
                <p className="text-lg text-gray-600">Lightning-fast response times for your Layer 2 queries</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Lock className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">Enhanced Security</h3>
                <p className="text-lg text-gray-600">Enterprise-grade security to protect your nodes and data</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Code className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">Easy Integration</h3>
                <p className="text-lg text-gray-600">Simple API for seamless integration with your applications</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center">
                <Server className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">1. Login</h3>
                <p className="text-lg text-gray-600">Set up your API account within just a few seconds</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Coins className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">2. Transact</h3>
                <p className="text-lg text-gray-600">Use our API to interact with the Bitcoin Layer 2 network</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-16 w-16 mb-6 text-[#d4c8b8]" />
                <h3 className="text-2xl font-bold mb-4">3. Scale</h3>
                <p className="text-lg text-gray-600">Easily scale your infrastructure as your needs grow</p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-16">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold mb-6">Starter</h3>
                <p className="text-5xl font-bold mb-6">$99<span className="text-xl font-normal">/month</span></p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-lg">
                    <Layers className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    1 Layer
                  </li>
                  <li className="flex items-center text-lg">
                    <Zap className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    100k API calls/month
                  </li>
                  <li className="flex items-center text-lg">
                    <Lock className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    Basic support
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </div>
              <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg border-2 border-[#d4c8b8]">
                <h3 className="text-3xl font-bold mb-6">Pro</h3>
                <p className="text-5xl font-bold mb-6">$299<span className="text-xl font-normal">/month</span></p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-lg">
                    <Layers className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    1 Layer 
                  </li>
                  <li className="flex items-center text-lg">
                    <Zap className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    500k API calls/month
                  </li>
                  <li className="flex items-center text-lg">
                    <Lock className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    Priority support
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </div>
              <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold mb-6">Enterprise</h3>
                <p className="text-5xl font-bold mb-6">Custom</p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center text-lg">
                    <Layers className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    3 Layer
                  </li>
                  <li className="flex items-center text-lg">
                    <Zap className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    Unlimited API calls
                  </li>
                  <li className="flex items-center text-lg">
                    <Lock className="h-6 w-6 mr-4 text-[#d4c8b8]" />
                    24/7 dedicated support
                  </li>
                </ul>
                <Button className="mt-auto">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Ready to Supercharge Your Layer 2 Apps?</h2>
                <p className="mx-auto max-w-[800px] text-xl text-gray-600">
                  Get started with Hermes today and experience the power of seamless Bitcoin Layer 2 infrastructure.
                </p>
              </div>
              <div className="w-full max-w-md space-y-4">
                <form className="flex space-x-4">
                  <Input className="flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 w-full border-t">
        <div className="container mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 sm:mb-0">© 2024 Hermes. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link className="text-sm hover:text-[#d4c8b8]" to="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:text-[#d4c8b8]" to="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}