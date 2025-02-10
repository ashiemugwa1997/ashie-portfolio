import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface AboutSectionProps {
  summary?: string;
  highlights?: string[];
  yearsOfExperience?: number;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  summary = "Lead Django Developer with 5+ years of experience in building scalable web applications. Currently leading development at ZETDC (Harare Region), specializing in power distribution management systems and enterprise software solutions.",
  highlights = [
    "Full-stack Development",
    "Team Leadership",
    "System Architecture",
    "API Design",
  ],
  yearsOfExperience = 5,
}) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">
                    Professional Summary
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{summary}</p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 rounded-full px-6 py-3">
                  <span className="text-4xl font-bold text-blue-600">
                    {yearsOfExperience}+
                  </span>
                  <div className="text-sm leading-tight">
                    <div className="font-semibold">Years of</div>
                    <div>Experience</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {highlights.map((highlight, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
