// app/demo-simple/page.tsx

export const dynamic = "force-static";

export default function Page() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui, sans-serif" }}>
      <h1>Garage Website Demo</h1>
      <p>This is a clean demo layout for independent garages.</p>

      <h2>Services</h2>
      <ul>
        <li>MOT Testing</li>
        <li>Servicing</li>
        <li>Repairs</li>
      </ul>

      <h2>Contact</h2>
      <p>Call: 01234 567 890</p>
      <p>Email: hello@torquesites.co.uk</p>
    </main>
  );
}
