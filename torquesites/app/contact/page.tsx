export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto text-center py-20 px-6">
      <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
      <p className="text-gray-600 mb-12">
        Have questions? Fill out the form below and our team will get back to you.
      </p>

      <form className="space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded-lg p-4"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded-lg p-4"
        />
        <textarea
          placeholder="Your Message"
          className="w-full border rounded-lg p-4"
          rows={4}
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-700"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
