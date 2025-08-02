"use client"

import { motion } from "framer-motion"
import { GraduationCap, Mail, Phone, Award } from "lucide-react"

export function FacultyMentor() {
  return (
    <section id="faculty" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-gray-800 relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 md:w-2 h-1 md:h-2 bg-primary rounded-full animate-float opacity-60" />
        <div
          className="absolute top-3/4 right-1/3 w-0.5 md:w-1 h-0.5 md:h-1 bg-primary rounded-full animate-float opacity-40"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full animate-float opacity-50"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block p-2 md:p-3 bg-primary/10 rounded-full mb-4 md:mb-6"
          >
            <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-primary animate-bounce-slow" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-white mb-4 md:mb-6">Chief Judge</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Being the the chief symbol of the justice for us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-10 border border-gray-700 hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/20"
          >
            <div className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex-shrink-0"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                    <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="flex-1 text-center lg:text-left"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-3xl font-bold font-poppins text-white mb-2 md:mb-3"
                >
                  Dr. Sarah Johnson
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="text-primary text-lg md:text-xl font-medium mb-4 md:mb-6"
                >
                  Professor, Computer Science Department
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  viewport={{ once: true }}
                  className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-base md:text-lg px-4 lg:px-0"
                >
                  With over 15 years of experience in computer science education and research, Dr. Johnson has been
                  instrumental in fostering competitive programming culture at our institution. Her expertise in
                  algorithms and data structures has guided countless students to excel in programming competitions.
                </motion.p>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
                >
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">15+</div>
                    <div className="text-xs md:text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">200+</div>
                    <div className="text-xs md:text-sm text-gray-400">Students Mentored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">50+</div>
                    <div className="text-xs md:text-sm text-gray-400">Research Papers</div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3 md:gap-4 justify-center lg:justify-start"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 md:gap-3 text-gray-300 hover:text-primary transition-colors cursor-pointer justify-center lg:justify-start"
                  >
                    <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base break-all">sarah.johnson@university.edu</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 md:gap-3 text-gray-300 hover:text-primary transition-colors cursor-pointer justify-center lg:justify-start"
                  >
                    <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm md:text-base">+1 (555) 123-4567</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
