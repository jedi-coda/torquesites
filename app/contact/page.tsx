export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact MOTmatch</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-6">
        Got a question? Whether you're a driver, garage, or investor — we'd love
        to hear from you.
      </p>

      {/* Replace action URL with your own Formspree endpoint */}
      <form
        action="https://formspree.io/f/YOUR-FORM-ID"
        method="POST"
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-left space-y-4"
      >
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            rows={4}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Hidden input to redirect after success */}
        <input type="hidden" name="_redirect" value="/success" />

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Send Message
        </button>
      </form>

      <p className="mt-4 text-gray-500 text-sm">
        💡 If your message doesn't send, email us directly at{" "}
        <a
          href="mailto:za.akhtar@gmail.com"
          className="text-pink-600 hover:underline"
        >
          za.akhtar@gmail.com
        </a>
      </p>
    </main>
  );
}