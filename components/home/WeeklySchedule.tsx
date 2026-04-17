const schedule: { day: string; sessions: { time: string; name: string; location: string; year: string }[] }[] = [
  {
    day: "Monday",
    sessions: [
      { time: "4:00–6:00pm", name: "Year 5 11+ English & Maths", location: "Earley", year: "Y5" },
      { time: "4:00–6:00pm", name: "GCSE Maths", location: "Reading", year: "GCSE" },
    ],
  },
  {
    day: "Tuesday",
    sessions: [
      { time: "4:00–6:00pm", name: "Year 4 11+ Foundation", location: "Caversham", year: "Y4" },
      { time: "5:00–7:00pm", name: "Year 5 Verbal Reasoning", location: "Slough", year: "Y5" },
    ],
  },
  {
    day: "Wednesday",
    sessions: [
      { time: "4:00–6:00pm", name: "Year 3 Early Start", location: "Earley", year: "Y3" },
      { time: "5:00–7:00pm", name: "GCSE English", location: "Reading", year: "GCSE" },
    ],
  },
  {
    day: "Thursday",
    sessions: [
      { time: "4:00–6:00pm", name: "Year 5 11+ Full Prep", location: "Caversham", year: "Y5" },
      { time: "4:30–6:30pm", name: "Year 4 Maths Focus", location: "Earley", year: "Y4" },
    ],
  },
  {
    day: "Saturday",
    sessions: [
      { time: "9:00am–12:00pm", name: "Year 5 Intensive", location: "Earley", year: "Y5" },
      { time: "9:00am–12:00pm", name: "Mock Exam Practice", location: "Slough", year: "Y5" },
      { time: "10:00am–1:00pm", name: "GCSE Booster", location: "Reading", year: "GCSE" },
    ],
  },
];

const yearColours: Record<string, string> = {
  Y3: "bg-blue-100 text-blue-800",
  Y4: "bg-purple-100 text-purple-800",
  Y5: "bg-green-100 text-green-800",
  GCSE: "bg-orange-100 text-orange-800",
};

export function WeeklySchedule() {
  return (
    <section className="py-16 bg-muted" aria-labelledby="schedule-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="schedule-heading" className="text-3xl font-bold text-primary mb-3">
            Weekly timetable
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Sessions run across our Earley, Caversham, Slough and Reading centres throughout the week.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="lg:hidden space-y-6">
          {schedule.map(({ day, sessions }) => (
            <div key={day} className="bg-white rounded-xl border border-border p-4">
              <h3 className="font-semibold text-primary mb-3">{day}</h3>
              <ul className="space-y-3" role="list">
                {sessions.map((s) => (
                  <li key={s.name} className="flex items-start gap-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded shrink-0 ${yearColours[s.year]}`}>
                      {s.year}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.time} · {s.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-5 gap-4">
          {schedule.map(({ day, sessions }) => (
            <div key={day} className="bg-white rounded-xl border border-border p-4">
              <h3 className="font-semibold text-primary text-sm mb-3 pb-2 border-b border-border">{day}</h3>
              <ul className="space-y-3" role="list">
                {sessions.map((s) => (
                  <li key={s.name}>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${yearColours[s.year]}`}>
                      {s.year}
                    </span>
                    <p className="text-sm font-medium mt-1">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                    <p className="text-xs text-muted-foreground">{s.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Can&apos;t see a suitable time?{" "}
          <a href="#contact" className="text-primary font-medium hover:underline">
            Contact us
          </a>{" "}
          about online sessions.
        </p>
      </div>
    </section>
  );
}
