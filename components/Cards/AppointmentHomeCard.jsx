import Image from "@node_modules/next/image";

const AppointmentHomeCard = () => {
  return (
    <div className="homecard">
      <div className="absolute top-10 left-10">
        <h2 className="homecard-title text-purple-900">
          My Appointments
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 object-contain -translate-y-5 translate-x-20"
          src="/assets/clipboard.png"
          alt=""
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="wave">
        <img className="w-full" src="/waves/wave (2).svg" alt="Wave background" />
      </div>
    </div>
  );
};

export default AppointmentHomeCard;
