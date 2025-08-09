import Image from "@node_modules/next/image";

const PharmacyHomeCard = () => {
  return (
    <div className="relative h-50 overflow-hidden w-[90vw] sm:w-sm mx-4 bg-white shadow-lg inset-shadow-sm/50 rounded-tr-2xl rounded-bl-2xl sm:h-64 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-[1.02]">
      <div className="absolute top-10 right-10">
        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          Order Medicine
        </h2>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10 flex justify-center">
        <Image
          className="w-40 sm:w-48 object-contain -translate-y-3 -translate-x-20"
          src="/assets/pills.png"
          alt="Doctor"
          width={500}
          height={500}
          priority
        />
      </div>

      <div className="h-1/2 absolute bottom-0 left-0 w-full z-0">
        <img
          className="w-full"
          src="/waves/wave (1).svg"
          alt="Wave background"
        />
      </div>
    </div>
  );
};

export default PharmacyHomeCard;
