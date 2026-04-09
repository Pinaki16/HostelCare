import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  ArrowRight, 
  Users, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import ThemeToggle from '../components/ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const features = [
    {
      title: "Easy Submission",
      description: "Submit your complaints in seconds with our intuitive interface.",
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Real-time Tracking",
      description: "Track the status of your complaint from pending to resolved in real-time.",
      icon: <Clock className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Smart Categorization",
      description: "Automatically route issues to the right department (Water, Electricity, Internet).",
      icon: <Zap className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Admin Monitoring",
      description: "Centralized dashboard for administration to monitor and resolve issues faster.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Student Feedback",
      description: "Provide feedback on resolved issues to help us improve our services.",
      icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Student Login",
      description: "Securely log in to your account using your student credentials."
    },
    {
      number: "02",
      title: "Submit Complaint",
      description: "Fill out a simple form with issue details and priority level."
    },
    {
      number: "03",
      title: "Admin Review",
      description: "Administration reviews and assigns the task to relevant staff."
    },
    {
      number: "04",
      title: "Issue Resolved",
      description: "Receive real-time updates until your issue is fully resolved."
    }
  ];

  const stats = [
    { label: "Complaints Resolved", value: "2,500+" },
    { label: "Active Students", value: "1,200+" },
    { label: "Avg. Resolution Time", value: "24 Hours" },
    { label: "Student Satisfaction", value: "98%" }
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Student, Block A",
      content: "The system is incredibly fast. My Wi-Fi issue was resolved within 2 hours of reporting!",
      avatar: "https://picsum.photos/seed/rahul/100/100"
    },
    {
      name: "Priya Patel",
      role: "Student, Block C",
      content: "I love how I can track the status. No more running to the warden's office every day.",
      avatar: "https://picsum.photos/seed/priya/100/100"
    },
    {
      name: "Amit Kumar",
      role: "Warden",
      content: "Managing complaints has never been easier. The dashboard gives me a clear overview of everything.",
      avatar: "https://picsum.photos/seed/amit/100/100"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HostelCare</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">How It Works</a>
              <a href="#contact" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">Contact</a>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
              <ThemeToggle />
              <button onClick={onGetStarted} className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">Login</button>
              <button onClick={onGetStarted} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
                Register
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button className="p-2 text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-4 space-y-4">
            <a href="#home" className="block text-base font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#features" className="block text-base font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-base font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <a href="#contact" className="block text-base font-medium text-slate-600 dark:text-slate-400" onClick={() => setIsMenuOpen(false)}>Contact</a>
            <div className="pt-4 flex flex-col gap-3">
              <button onClick={onGetStarted} className="w-full py-3 text-center font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl">Login</button>
              <button onClick={onGetStarted} className="w-full py-3 text-center font-semibold text-white bg-blue-600 rounded-xl">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3" />
                Fast & Efficient Reporting
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6">
                Simplifying Hostel <span className="text-blue-600">Issue Reporting</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
                Empowering students to report maintenance issues instantly and track resolution progress in real-time. A smarter way to manage hostel life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={onGetStarted}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 dark:shadow-none group"
                >
                  Submit Complaint
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={onGetStarted}
                  className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all"
                >
                  Track Complaint
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50"></div>
              <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl shadow-slate-200 dark:shadow-none p-4 border border-slate-100 dark:border-slate-800">
                <img 
                  src="https://picsum.photos/seed/hostel-maintenance/800/600" 
                  alt="Hostel Maintenance" 
                  className="rounded-[1.5rem] w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl dark:shadow-none border border-slate-50 dark:border-slate-700 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-600 dark:text-green-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Resolved Today</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">42 Issues</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-500 mb-2">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] mb-4">Core Features</h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Everything you need to manage complaints effectively</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">Our platform is designed to bridge the gap between students and administration with powerful tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
                <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">Workflow</h2>
            <p className="text-4xl font-bold mb-6">How it works in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-black text-white/10 mb-6">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-6 w-12 h-px bg-white/10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Benefits for Everyone</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                    <Users className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">For Students</h4>
                    <p className="text-slate-600 dark:text-slate-400">Instant reporting, transparent tracking, and faster resolutions to daily problems.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">For Administration</h4>
                    <p className="text-slate-600 dark:text-slate-400">Better resource allocation, clear accountability, and organized data for decision making.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <Zap className="text-green-600 dark:text-green-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">For Staff</h4>
                    <p className="text-slate-600 dark:text-slate-400">Clear work assignments, prioritized tasks, and easy status reporting.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-12">
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">90% Reduction in paperwork</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">50% Faster resolution time</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">100% Transparency for students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What our users say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-600 dark:text-slate-400 italic mb-8">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              <div>
                <h2 className="text-4xl font-bold mb-6">Need help? Get in touch</h2>
                <p className="text-blue-100 mb-10 text-lg">Our hostel administration office is always here to support you with any urgent matters.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Phone Support</p>
                      <p className="text-xl font-bold">+91 123 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Email Address</p>
                      <p className="text-xl font-bold">office@hostelcare.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-200">Office Location</p>
                      <p className="text-xl font-bold">Main Admin Block, Floor 1</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-slate-900 dark:text-white shadow-2xl dark:shadow-none">
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Name</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Roll No</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" placeholder="Roll No" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Message</label>
                    <textarea className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 text-slate-900 dark:text-white" placeholder="How can we help?"></textarea>
                  </div>
                  <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HostelCare</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Dedicated to providing a seamless living experience for students through efficient maintenance and complaint management.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                <li><a href="#home" className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
                <li><button onClick={onGetStarted} className="hover:text-blue-600 transition-colors">Login</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-sm text-slate-400 font-medium">
            <p>© 2026 HostelCare Management System. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
