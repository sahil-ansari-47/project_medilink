import Image from "next/image";

const AmbulanceHomeCard = () => {
  return (
    <div className="homecard">
      <div className="absolute top-10 left-4 xs:left-10">
        <h2 className="homecard-title text-red-900">
          Book An Ambulance
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 object-contain -translate-y-4 translate-x-20"
          src="/assets/ambulance.png"
          alt="Ambulance"
          width={200}
          height={200}
        />
      </div>

      <div className="wave">
        <img className="w-full" src="/waves/wave (3).svg" alt="Wave background" />
      </div>
    </div>
  );
};

export default AmbulanceHomeCard;
