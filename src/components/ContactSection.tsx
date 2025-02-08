import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Github, Linkedin, Mail, Send, Download } from "lucide-react";

interface ContactSectionProps {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  email = "ashleyzarter@gmail.com",
  linkedinUrl = "https://linkedin.com/in/ashley-mugwambi",
  githubUrl = "https://github.com/ashiemugwa1997",
  resumeUrl = "/resume.pdf",
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSocialLoading, setSocialLoading] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleSocialClick = async (type: string, url: string) => {
    setSocialLoading(type);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.open(url, "_blank");
    setSocialLoading("");
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Get in Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Input placeholder="Your Name" className="w-full" />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full min-h-[150px]"
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="w-full flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a
                    href={`mailto:${email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {email}
                  </a>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => handleSocialClick("linkedin", linkedinUrl)}
                    disabled={isSocialLoading === "linkedin"}
                  >
                    <Linkedin className="w-4 h-4" />
                    {isSocialLoading === "linkedin"
                      ? "Opening..."
                      : "LinkedIn Profile"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => handleSocialClick("github", githubUrl)}
                    disabled={isSocialLoading === "github"}
                  >
                    <Github className="w-4 h-4" />
                    {isSocialLoading === "github"
                      ? "Opening..."
                      : "GitHub Profile"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => handleSocialClick("resume", resumeUrl)}
                    disabled={isSocialLoading === "resume"}
                  >
                    <Download className="w-4 h-4" />
                    {isSocialLoading === "resume"
                      ? "Opening..."
                      : "Download Resume"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Address: 17161 Sable Close, Borrowdale West, Harare
                  </p>
                  <p className="text-gray-600">Cell: 0774243750, 0777457806</p>
                  <p className="text-gray-600">
                    Currently Lead Programmer at ZETDC (Harare Region)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
