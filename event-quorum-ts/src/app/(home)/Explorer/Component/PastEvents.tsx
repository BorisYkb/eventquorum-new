import EventCard from './EventCard';

export default function PastEvents() {
  // Données des événements passés
  const pastEvents = [
    {
      id: 1,
      title: "Assemblée Générale de la Société Générale de Côte d'Ivoire 2024",
      date: "27-28 novembre 2024",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/ag_sgci_2024.jpeg",
      link: "/events/heavent-paris-2024"
    },
    {
      id: 2,
      title: "Assemblée Générale de ORANGE CI 2025",
      date: "10 Avril 2025",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/ag_orange.jpg",
      link: "/events/heavent-paris-2023"
    },
    {
      id: 3,
      title: "Assemblée Générale de Neslé",
      date: "5-6 juin 2024",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/ag_nesle.jpg",
      link: "/events/conference-europeenne-ux-ui"
    },
    {
      id: 4,
      title: "Assemblée Générale",
      date: "15-17 mai 2023",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/imex-frankfurt.jpg",
      link: "/events/imex-frankfurt"
    },
    {
      id: 5,
      title: "Assemblée Générale de SAPH 2025",
      date: "8 avril 2025",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/ag_SAPH.jpg",
      link: "/events/see-you-there"
    },
    {
      id: 6,
      title: "Assemblée Générale de SucreIvoir 2023",
      date: "26 Août 2024",
      location: "Abidjan, Côte d'Ivoire",
      imageSrc: "/events/2024-sucrivoire-ag.jpg",
      link: "https://groupesifca.com/sucrivoire-tenue-de-lassemblee-generale-mixte-2023/"
    }
  ];

  return (
    <div className=' mt-15 lg:mt-25'>
        <h2 className="uppercase text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-10">
          Nous y{" "}
          <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-yellow-400 text-transparent bg-clip-text ml-2">
            étions
          </span>
        </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            imageSrc={event.imageSrc}
            link={event.link}
          />
        ))}
      </div>
    </div>
  );
}