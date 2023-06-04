import { Calendar } from "@/components/calendar/calendar";
import styles from "./card.module.scss";
import { TBookings } from "@/utils/types.d";

type TCardProps = {
  apartment: {
    bookings: TBookings;
    id: number;
    name: string;
    info: string;
    image: {
      id: string;
      description?: string;
    };
    tags?: string[];
  };
  onClick: () => void;
};

export const Card = ({ apartment, onClick }: TCardProps) => {
  const wfImage = (id: string, size: "th" | "lg") =>
    `https://wunderflatsng.blob.core.windows.net/imagesproduction/${id}${
      size === "th" ? "-thumbnail" : size === "lg" ? "-large" : ""
    }.jpg`;

  return (
    <div className={styles.card}>
      <div className={styles["card-container"]}>
        <img
          src={wfImage(apartment.image.id, "th")}
          alt={apartment.image.description}
          onClick={onClick}
        />
        <div className={styles.text}>
          <h3 className={styles.text__description_head}>{apartment.name}</h3>
          {apartment.info && (
            <p className={styles.text__description_body}>{apartment.info}</p>
          )}
        </div>
        {apartment.tags && (
          <div className={styles.tags}>
            {apartment.tags.map((tag, index) => (
              <span
                key={`tag-${index}`}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Calendar
        apartment={apartment.name}
        bookings={apartment.bookings}
        className={styles.calendar}
      />
    </div>
  );
};
