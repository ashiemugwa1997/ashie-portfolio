import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  
  // Replace with your actual WhatsApp number in international format (no + or spaces)
  // Example: for +1 (234) 567-8900, use "12345678900"
  const whatsappNumber = "+263774243750";
  
  return (
    <section id="contact" className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Get in Touch
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Mail className={theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:your.ashleyzarter@gmail.com" 
                className={`underline ${theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
              >
                your.ashleyzarter@gmail.com
              </a>
            </CardContent>
          </Card>
          
          <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Phone className={theme === 'dark' ? 'text-green-300' : 'text-green-600'} />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="tel:+263774243750" 
                className={`underline ${theme === 'dark' ? 'text-green-300 hover:text-green-200' : 'text-green-600 hover:text-green-800'}`}
              >
                +263 (774) 243750
              </a>
            </CardContent>
          </Card>
          
          <Card className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}`}>
            <CardHeader className="flex flex-row items-center gap-4">
              <MessageSquare className={theme === 'dark' ? 'text-green-300' : 'text-green-600'} />
              <CardTitle>WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <p>Chat with me directly via WhatsApp</p>
              <Button 
                className={theme === 'dark' ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'}
              >
                <a 
                  href={`https://wa.me/${whatsappNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white flex items-center gap-2"
                >
                  <MessageSquare size={18} />
                  Message on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
