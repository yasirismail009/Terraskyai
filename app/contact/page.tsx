export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#383F19] px-4 sm:px-6 lg:px-10 py-14">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-widest">
            Contact Us
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">
            We’re here to help your farm thrive
          </h1>
          <p className="text-lg text-[#383F19]/85">
            Send us a message with your farm details and goals—we’ll reply with
            tailored recommendations and next steps.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#383F19]/10 p-6 sm:p-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg border border-[#383F19]/20 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#383F19]/60"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#383F19]/20 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#383F19]/60"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="message">
              Tell us about your farm and what you need
            </label>
            <textarea
              id="message"
              placeholder="Acres, crops, current challenges, and the outcomes you’re targeting…"
              rows={6}
              className="w-full rounded-lg border border-[#383F19]/20 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#383F19]/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#383F19] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#2f3615] transition-colors">
              Send Message
              <span aria-hidden>→</span>
            </button>
            <div className="text-sm text-[#383F19]/80">
              Prefer email? Reach us at{" "}
              <a
                className="font-semibold text-[#383F19] underline"
                href="mailto:support@terraskyai.com"
              >
                support@terraskyai.com
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[#383F19]/70">
          Call us: <span className="font-semibold">+1 (401) 655 898</span>
        </div>
      </div>
    </div>
  );
}

