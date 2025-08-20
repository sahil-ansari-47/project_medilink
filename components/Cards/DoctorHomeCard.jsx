import Image from "next/image";

const DoctorHomeCard = () => {
  return (
    <div className="homecard">
      <div className="absolute top-10 right-10">
        <h2 className="homecard-title text-emerald-900">
          Consult a Doctor
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 h-auto transform -translate-x-20"
          src="/assets/doctor.png"
          alt="Doctor"
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="wave">
        <img className="w-full" src="/waves/wave.svg" alt="Wave background" />
      </div>
    </div>
  );
};

export default DoctorHomeCard;
