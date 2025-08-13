import Image from "@node_modules/next/image";

const NurseHomeCard = () => {
  return (
    <div className="homecard">
      <div className="absolute top-10 right-10">
        <h2 className="homecard-title text-sky-700">
          Nursing Services
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 h-auto transform -translate-x-20"
          src="/assets/nurse.png"
          alt="Nurse"
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="wave">
        <img className="w-full" src="/waves/wave (4).png" alt="Wave background" />
      </div>
    </div>
  );
};

export default NurseHomeCard;
