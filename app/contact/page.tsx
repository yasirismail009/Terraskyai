export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#1f2933] px-4 sm:px-6 lg:px-10 py-16 flex items-center">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-[#e5e7eb]">
        <div className="bg-linear-to-br from-[#10394a] to-[#145f75] text-white p-8 sm:p-10 flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#b9f5d0]">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              We’re here to help your farm thrive
            </h1>
            <p className="text-base text-white/85">
              Share your goals and challenges—our team will respond with tailored
              recommendations for your operation.
            </p>
          </div>
          <div className="space-y-4 text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <p className="font-semibold">Call us</p>
              <p className="text-white/85">+1 (401) 655 898</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 border border-white/20">
              <p className="font-semibold">Email</p>
              <a
                className="text-white font-semibold underline"
                href="mailto:support@terraskyai.com"
              >
                support@terraskyai.com
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm sm:text-base">
            <p className="font-semibold">Follow us</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Facebook", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white border border-white/30 hover:bg-white/20 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 space-y-6 bg-white">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
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
                className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
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
              className="w-full rounded-lg border border-[#d5d9dc] px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#145f75]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#2f855a] px-6 py-3 text-white font-semibold shadow-md hover:bg-[#276d4b] transition-colors">
              Send Message
              <span aria-hidden>→</span>
            </button>
            <div className="text-sm text-[#4b5563]">
              Prefer email? Reach us at{" "}
              <a
                className="font-semibold text-[#145f75] underline"
                href="mailto:support@terraskyai.com"
              >
                support@terraskyai.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

