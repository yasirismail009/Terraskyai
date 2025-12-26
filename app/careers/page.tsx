'use client';

import { useState } from 'react';

const openPositions = [
  {
    id: 1,
    title: "Summer Crop Scout – Seasonal/2025",
    department: "Field Operations",
    location: "Southern Alberta",
    type: "Seasonal (May 01 - Aug. 31, 2025)",
    description: "We are seeking dedicated and detail-oriented Seasonal Summer Crop Scout to join our team in Southern Alberta for the 2025 growing season. As a crop scout, you will play a crucial role in executing flight missions using UAS and data validation process by performing ground truthing activities.",
    responsibilities: [
      "Scout fields and collect critical agronomic data using advanced tech tools",
      "Conduct field inspections to collect ground truth data & validate drone-collected imagery for computer vision analytics",
      "Identify and document crop conditions, pests, diseases, and other agronomic factors",
      "Process field data for ML team for alignment on new and existing crop model development & refinement",
      "Communicate findings and insights with data analysts and agronomists to support data accuracy and report generation",
      "Execute drone flight missions for customers in Southern AB",
      "Collaborate with other drone operators to ensure timely and efficient data collection",
      "Maintain accurate and detailed records of field observations and measurements",
      "Adhere to safety protocols and company guidelines while performing fieldwork",
      "Assist in development & periodic review of new & existing protocols, SOPs and safety documents"
    ],
    requirements: [
      "Students or recent grads in Agronomy, Agriculture, GIS, Environmental Science, or related fields",
      "Education or background in Agriculture, Agronomy, Plant Pathology, Entomology, Environmental Science",
      "Previous experience in crop scouting, canola seed production, field inspections, or related agricultural work is an asset",
      "Valid RPAS drone pilot license through Transport Canada will be required",
      "Familiarity with agricultural pests, diseases, and crop management practices",
      "Ability to work independently and in various weather conditions",
      "Strong attention to detail and accuracy in data collection",
      "Proficiency with GPS tools and basic computer skills",
      "Valid Canadian driver's license and reliable transportation is required",
      "Ability to walk long distances and perform physically demanding tasks"
    ],
    preferredSkills: [
      "Knowledge of precision agriculture technologies and remote sensing",
      "Experience with drones and aerial imagery interpretation",
      "Strong communication skills and ability to work in a team environment",
      "Problem-solving skills and ability to make informed decisions in the field"
    ],
    compensation: "Competitive salary based on experience and qualifications. Travel expense mileage / fuel reimbursement",
    applicationEmail: "patricia.yamada@terraskyai.com",
    applicationSubject: "Summer Crop Scout - Southern Alberta",
    applicationDeadline: "December 15, 2025"
  },
  {
    id: 2,
    title: "AI Agronomist",
    department: "Field Operations",
    location: "Southern Alberta",
    type: "Seasonal (April to September 2026)",
    description: "We are currently seeking dedicated and detail-oriented AI Agronomist to join our team in Southern Alberta for the 2025 growing season. As an AI Agronomist, you will play a crucial role in executing flight missions and data validation process by performing ground truthing activities.",
    responsibilities: [
      "Conduct field inspections to collect ground truth data to validate drone-collected imagery and computer vision analytics",
      "Execute drone flight missions for customers in Southern AB",
      "Identify and document crop conditions, pests, diseases, and other agronomic factors",
      "Use GPS tools to accurately locate and record field data points",
      "Collaborate with drone operators to ensure timely and efficient data collection",
      "Communicate findings and insights with data analysts and agronomists to support data accuracy and report generation",
      "Maintain accurate and detailed records of field observations and measurements",
      "Adhere to safety protocols and company guidelines while performing fieldwork"
    ],
    requirements: [
      "Bachelor's degree in agriculture, GIS, Agronomy, Plant breeding, Soil Science, Ag biotechnology, or related field preferred",
      "Previous experience in canola seed production, crop scouting, field inspections is required",
      "Valid RPAS drone pilot license through Transport Canada",
      "Familiarity with agricultural pests, diseases, and crop management practices",
      "Ability to work independently and in various weather conditions",
      "Strong attention to detail and accuracy in data collection",
      "Proficiency with GPS tools and basic computer skills",
      "Valid driver's license and reliable transportation",
      "Ability to walk long distances and perform physically demanding tasks"
    ],
    preferredSkills: [
      "Knowledge of precision agriculture technologies and remote sensing",
      "Experience with drones and aerial imagery interpretation",
      "Strong communication skills and ability to work in a team environment",
      "Problem-solving skills and ability to make informed decisions in the field"
    ],
    compensation: "Competitive salary based on experience and qualifications. Travel expense and mileage reimbursement",
    applicationEmail: "patricia.yamada@terraskyai.com",
    applicationSubject: "AI Agronomist - Southern Alberta",
    applicationDeadline: "December 15, 2025"
  }
];

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    cv: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, cv: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your application! We will review your CV and get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-[#E6E2D6]">
      {/* Hero Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#454411] mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-[#545454] max-w-3xl mx-auto leading-relaxed">
            Help us revolutionize agriculture through AI and technology. Be part of a team that's making a real impact on farming and food security.
          </p>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#454411] mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-[#545454]">
              Explore current opportunities to join TerraSkyAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {openPositions.map((position) => (
              <div
                key={position.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#8B5E3C]/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPosition(selectedPosition === position.id ? null : position.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#454411] mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-[#545454]">
                      <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                        {position.location}
                      </span>
                      <span className="px-3 py-1 bg-[#E6E2D6] rounded-full">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`text-2xl transition-transform ${selectedPosition === position.id ? 'rotate-180' : ''}`}
                  >
                    ▼
                  </button>
                </div>

                <p className="text-base text-[#545454] mb-4">
                  {position.description}
                </p>

                {selectedPosition === position.id && (
                  <div className="mt-6 pt-6 border-t border-[#b0b0b0]/30 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#454411] mb-3">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-2 text-[#545454]">
                        {position.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#BEA950] mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-[#454411] mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2 text-[#545454]">
                        {position.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#BEA950] mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {position.preferredSkills && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Preferred Skills:
                        </h4>
                        <ul className="space-y-2 text-[#545454]">
                          {position.preferredSkills.map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#BEA950] mt-1">•</span>
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {position.compensation && (
                      <div>
                        <h4 className="text-lg font-semibold text-[#454411] mb-3">
                          Compensation:
                        </h4>
                        <p className="text-[#545454]">
                          {position.compensation}
                        </p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#b0b0b0]/30">
                      <p className="text-sm text-[#545454] mb-2">
                        <strong>Application Deadline:</strong> {position.applicationDeadline}
                      </p>
                      <p className="text-sm text-[#545454]">
                        Please email your application to{' '}
                        <a 
                          href={`mailto:${position.applicationEmail}?subject=${encodeURIComponent(position.applicationSubject)}`}
                          className="text-[#454411] font-semibold underline hover:text-[#BEA950]"
                        >
                          {position.applicationEmail}
                        </a>
                        {' '}with the subject line "{position.applicationSubject}"
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, position: position.title }));
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-[#454411] hover:bg-[#454411]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Apply for this Position
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="bg-white px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#454411] mb-4">
              Submit Your Application
            </h2>
            <p className="text-lg text-[#545454]">
              Fill out the form below to apply for a position or submit your CV for future opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-[#E6E2D6] rounded-2xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#454411] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#454411] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#454411] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-[#454411] mb-2">
                  Position Applying For *
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411] bg-white"
                >
                  <option value="">Select a position</option>
                  {openPositions.map((pos) => (
                    <option key={pos.id} value={pos.title}>
                      {pos.title}
                    </option>
                  ))}
                  <option value="General Application">General Application</option>
                </select>
              </div>

              <div>
                <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#454411] mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411]"
                  placeholder="Tell us why you're interested in joining TerraSkyAI..."
                />
              </div>

              <div>
                <label htmlFor="cv" className="block text-sm font-semibold text-[#454411] mb-2">
                  Upload CV/Resume *
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full rounded-lg border border-[#b0b0b0] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#454411] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#454411] file:text-white hover:file:bg-[#454411]/80"
                />
                <p className="text-xs text-[#b0b0b0] mt-2">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#454411] hover:bg-[#454411]/80 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
