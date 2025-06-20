import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  imageSrc: string;
  link: string;
}

export default function EventCard({ title, date, location, imageSrc, link }: EventCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="relative overflow-hidden rounded-lg transition-transform transform hover:scale-[1.02]">
        <div className="aspect-[4/3] relative">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill
            className="object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-300 mt-1">{date} - {location}</p>
        </div>
      </div>
    </Link>
  );
}