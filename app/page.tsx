"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// --- Resume Data ---
const CONTACT_INFO = {
  name: "Mark Steven D. Reyes",
  title: "Full Stack Developer & Web Engineer",
  email: "mstevenreyes@gmail.com",
  phone: "+63 956 802 2028",
  location: "Malabon, NCR, Philippines",
  linkedin: "https://linkedin.com/in/mstevenreyes",
  github: "https://github.com",
};

const ROADMAP_DATA = [
  {
    period: "07/2026 – 01/2027",
    role: "Full Stack Developer",
    company: "Comrise (Contract - Deployed to Willis Towers Watson)",
    location: "Taguig, Philippines",
    type: "Work Experience",
    details: [
      "Implemented responsive web designs utilizing an in-house CMS and maintained regular client status updates.",
      "Maintained comprehensive project documentation across system architecture and workflows.",
      "Communicated directly with consultants and clients regarding design revisions and project timeline retainments.",
    ],
    tech: ["Next.js", "React.js", "JavaScript", "HTML/CSS", "Respond.io", "ManyChat"],
  },
  {
    period: "02/2026 – 05/2026",
    role: "Full Stack Developer",
    company: "AP Creative Advertising Corp.",
    location: "Makati, Philippines",
    type: "Work Experience",
    details: [
      "Collaborated on building internal Accounting Software for company financial management.",
      "Developed high-converting landing pages for sister companies including nightclubs, restaurants, and e-scooter stores.",
      "Engineered a food delivery application and trained AI Agents to automate customer inquiries and restaurant reservations.",
    ],
    tech: ["Next.js", "React.js", "JavaScript", "Respond.io", "ManyChat", "AI Agents"],
  },
  {
    period: "07/2025 – 12/2025",
    role: "Web Developer",
    company: "Comrise (Contract - Deployed to Willis Towers Watson)",
    location: "Taguig, Philippines",
    type: "Work Experience",
    details: [
      "Executed custom website builds utilizing Embark CMS adhering to enterprise UI/UX specifications.",
      "Updated project documentations and conducted design review syncs with international consultants.",
    ],
    tech: ["Embark CMS", "JavaScript", "HTML/CSS", "UI Implementation"],
  },
  {
    period: "11/2023 – 06/2025",
    role: "Web Developer",
    company: "IT Managers Inc. (Contract - Deployed to Toyota Motors Philippines)",
    location: "Makati, Philippines",
    type: "Work Experience",
    details: [
      "Designed and deployed a Learning Management System (LMS) serving nationwide Toyota dealership education.",
      "Overhauled legacy LMS codebase to fix deprecated libraries and critical stability issues.",
    ],
    tech: ["HTML/CSS", "JavaScript", "Microsoft Azure", "Microsoft SharePoint", "Power BI", "Power Automate"],
  },
  {
    period: "06/2018 – 09/2023",
    role: "Bachelor of Science in Information Technology",
    company: "Polytechnic University of the Philippines",
    location: "Sta. Mesa, Manila",
    type: "Education",
    details: [
      "Specialized in Web Development, Computer Programming, Database Management, and Software Engineering.",
    ],
    tech: ["Web Development", "Database Architecture", "OOP", "Software Engineering"],
  },
  {
    period: "06/2016 – 04/2018",
    role: "Tech Voc - ICT Computer Programming",
    company: "Arellano University",
    location: "Malabon, Philippines",
    type: "Education",
    details: [
      "Foundational technical vocational education in logic, algorithm design, and programming concepts.",
    ],
    tech: ["ICT Programming", "HTML/CSS", "Logic & Fundamentals"],
  },
];

const SKILL_CATEGORIES = [
  {
    name: "Frontend Development",
    skills: ["React.js", "Next.js", "Vue.js", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3", "Elementor", "Responsive Design"],
  },
  {
    name: "Backend & Databases",
    skills: ["PHP", "Laravel", "MySQL", "SQL", "AJAX", "JSON", "RESTful APIs", "Postman API"],
  },
  {
    name: "AI & Automation",
    skills: ["AI Agent Training", "Respond.io", "ManyChat", "Power Automate", "Power BI"],
  },
  {
    name: "Cloud & Dev Tools",
    skills: ["Microsoft Azure", "SharePoint", "Linux", "Secure Shell (SSH)", "WordPress", "Git & GitHub"],
  },
];

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setErrorMsg("Please complete the captcha to verify you are human.");
      return;
    }

    if (!formRef.current) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await emailjs.sendForm(
        'service_2d32ce3',       // Your specific service ID
        'YOUR_TEMPLATE_ID',      // Replace with your EmailJS Template ID
        formRef.current,
        'YOUR_PUBLIC_KEY'        // Replace with your EmailJS Public Key
      );

      setFormSubmitted(true);
      formRef.current.reset();
      setCaptchaToken(null);
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setErrorMsg("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* --- Sticky Navigation Bar --- */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-zinc-800/80 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="#" className="text-lg font-bold tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black font-black text-sm">
              MR
            </span>
            <span className="text-zinc-200 hover:text-white transition-colors">{CONTACT_INFO.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#roadmap" className="hover:text-emerald-400 transition-colors">Roadmap</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </nav>

          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-zinc-800 text-zinc-200 hover:bg-emerald-500 hover:text-black border border-zinc-700 hover:border-emerald-400 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section id="about" className="max-w-6xl mx-auto px-6 pt-20 pb-28 min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
         {/* Hero Content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start gap-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for Full-Stack & Web Roles
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Building practical web applications and responsive user experiences.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg text-zinc-400 max-w-xl leading-relaxed">
              Hi, I&apos;m <span className="text-white font-medium">{CONTACT_INFO.name}</span>. I am a full-stack developer with experience building custom web software, LMS platforms, and integrating functional AI workflows.
            </motion.p>

            {/* Quick Specs */}
            <motion.div variants={fadeInUp} className="pt-6 border-t border-zinc-800/80 flex flex-wrap gap-8 text-xs font-mono text-zinc-400">
              <div>
                <span className="text-zinc-500 block">LOCATION</span>
                <span className="text-zinc-200">{CONTACT_INFO.location}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">CORE TECH</span>
                <span className="text-zinc-200">Next.js • React • Node • PHP</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Portrait / Photo Section */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative group w-72 h-80 sm:w-80 sm:h-96">
              {/* Outer Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 group-hover:opacity-70 blur-xl transition duration-500"></div>

              {/* Image Frame Container */}
              <div className="relative w-full h-full rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                
                {/* 
                  NOTE FOR PHOTO REPLACEMENT:
                  Uncomment the <Image /> component below and place your portrait photo at /public/portrait.png
                */}
                
                <Image
                  src="/portrait.png"
                  alt={CONTACT_INFO.name}
                  fill
                  className="object-cover rounded-3xl group-hover:scale-105 transition duration-500"
                  priority
                />
                
                <h3 className="text-lg font-bold text-white mb-1">{CONTACT_INFO.name}</h3>
                <p className="text-xs text-emerald-400 font-mono mb-3">Full Stack & Web Developer</p>
                <p className="text-xs text-zinc-500 max-w-[200px]">
                  Place your portrait at <code className="text-zinc-300">/public/portrait.png</code> to activate photo view.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- Roadmap Section --- */}
      <section id="roadmap" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative">
        <div className="max-w-5xl mx-auto px-6">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Career Progress</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Developer Roadmap & Experience</h2>
            <p className="text-zinc-400 mt-3 text-sm">
              A timeline of my professional work experience, contract deployments, and education background.
            </p>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-zinc-800 ml-4 sm:ml-32 space-y-12">
            {ROADMAP_DATA.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8 sm:pl-10 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.1 } },
                }}
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-900 border-2 border-emerald-500 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-300"></span>

                {/* Left Date Label for Desktop */}
                <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono text-emerald-400 font-semibold mb-2 sm:mb-0 sm:w-28 sm:text-right">
                  {item.period}
                </div>

                {/* Timeline Card */}
                <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {item.type}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-emerald-400/90 mb-1">{item.company}</p>
                  <p className="text-xs text-zinc-500 mb-4">{item.location}</p>

                  <ul className="space-y-2 mb-4 text-sm text-zinc-300">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- Tech Skills Grid --- */}
      <section id="skills" className="py-24 bg-black border-t border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-6">
          
          <motion.div 
            className="text-center max-w-2xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Technical Competencies</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Skills & Technologies</h2>
            <p className="text-zinc-400 mt-3 text-sm">
              Languages, frameworks, database architectures, cloud tools, and AI automation workflows I use daily.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: idx * 0.1 } },
                }}
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-800/90 text-zinc-300 border border-zinc-700/60 hover:text-white hover:border-emerald-500/60 transition duration-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-800/80">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            
            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">Let&apos;s Work Together</h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  I am open to full-time web developer and full-stack positions. Feel free to reach out directly via email, phone, or LinkedIn.
                </p>

                <div className="space-y-4 text-sm font-mono">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
                    <span className="text-emerald-400 text-lg">✉</span>
                    <div>
                      <span className="text-xs text-zinc-500 block">EMAIL</span>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-zinc-200 hover:text-emerald-400 transition">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
                    <span className="text-emerald-400 text-lg">📞</span>
                    <div>
                      <span className="text-xs text-zinc-500 block">PHONE</span>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-zinc-200 hover:text-emerald-400 transition">
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
                    <span className="text-emerald-400 text-lg">🔗</span>
                    <div>
                      <span className="text-xs text-zinc-500 block">LINKEDIN</span>
                      <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-400 transition">
                        linkedin.com/in/mstevenreyes
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
              
              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-mono text-sm">
                  ✓ Thank you! Your message has been recorded. I will get back to you shortly.
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="Job Opportunity / Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Hi Mark, we would love to discuss a developer role with you..."
                      className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <ReCAPTCHA
                      sitekey="YOUR_RECAPTCHA_SITE_KEY"
                      onChange={(token) => setCaptchaToken(token)}
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 disabled:bg-emerald-500/50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 transition duration-200"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 border-t border-zinc-800/80 bg-black text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {CONTACT_INFO.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-zinc-300 transition">Back to Top ↑</a>
          </div>
        </div>
      </footer>

    </div>
  );
}