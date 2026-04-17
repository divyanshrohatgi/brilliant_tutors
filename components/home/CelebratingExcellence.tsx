const successStories = [
  { name: "Amelia T.", school: "Kendrick School", year: "Year 6, 2024" },
  { name: "Rohan P.", school: "Reading School", year: "Year 6, 2024" },
  { name: "Sophie H.", school: "Abbey School", year: "Year 6, 2024" },
  { name: "Ethan K.", school: "FSCE Grammar", year: "Year 6, 2024" },
  { name: "Priya M.", school: "Upton Court Grammar", year: "Year 6, 2024" },
  { name: "James W.", school: "Holyport College", year: "Year 6, 2024" },
];

export function CelebratingExcellence() {
  return (
    <section className="relative overflow-hidden py-20" aria-labelledby="excellence-heading">
      {/* Background with overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/celebrating-excellence-bg.svg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(27,43,75,0.92)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-3">Class of 2024</p>
        <h2 id="excellence-heading" className="text-3xl font-extrabold text-white tracking-tight mb-3">
          Celebrating excellence
        </h2>
        <p className="text-white/60 leading-7 max-w-xl mx-auto mb-12">
          Proud to have helped these students earn places at their first-choice schools.
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" role="list">
          {successStories.map(({ name, school, year }) => (
            <li key={name} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-accent font-bold text-lg">{name[0]}</span>
              </div>
              <p className="text-white font-semibold text-sm">{name}</p>
              <p className="text-accent text-xs mt-1 leading-tight">{school}</p>
              <p className="text-white/40 text-xs mt-0.5">{year}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
