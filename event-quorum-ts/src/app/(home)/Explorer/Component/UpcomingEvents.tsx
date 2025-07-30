"use client";

import Link from 'next/link';

export default function UpcomingEvents() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Assemblée Générale de SITAB",
      date: "30 Juillet 2025",
      location: "Plateau, Abidjan",
      link: "/events/heavent-meetings-cannes"
    },
    {
        id: 2,
        title: "Assemblée Générale de la Société Générale de Côte d'Ivoire",
        date: "14 Juillet 2025",
        location: "Novotel, Abidjan",
        link: "/events/heavent-meetings-cannes"
    }
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 -mt-20 lg:-mt-25 mx-auto max-w-5xl shadow-md">
      <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 lg:mb-8 text-center sm:text-left">
        Événements à venir
      </h2>

      <div className="space-y-5 sm:space-y-6 lg:space-y-8">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-green-100 dark:bg-gray-900 p-4 sm:p-5 lg:p-6 rounded-md shadow-sm space-y-2 sm:space-y-3 transition hover:shadow-lg"
          >
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              {event.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              📅 <span className="font-medium">{event.date}</span> — 📍 {event.location}
            </p>

            <Link href={event.link}>
              <span className="inline-block mt-2 sm:mt-3 px-4 sm:px-5 py-1.5 sm:py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium rounded-md transition">
                Inscrivez-vous ici
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
