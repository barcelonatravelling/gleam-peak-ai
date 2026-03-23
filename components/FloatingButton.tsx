import Image from "next/image";

export default function FloatingButton() {
  return (
    <button
     onClick={() => {
  const event = new CustomEvent("open-assistant");
  window.dispatchEvent(event);
}}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition duration-300 bg-purple-500"></div>

        <Image
          src="/assistant-icon.png"
          alt="AI Assistant"
          width={60}
          height={60}
          className="relative rounded-full"
        />
      </div>
    </button>
  );
}